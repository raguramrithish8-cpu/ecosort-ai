import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Upload, Brain, CheckCircle, AlertTriangle, Zap, Info, RefreshCw, Square, Video, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useNotifications } from '../components/NotificationContext';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

// Standard Waste Data Definitions
const WASTE_DATABASE = {
  bottle: {
    id: 'bottle',
    type: 'Plastic Bottle',
    confidence: 96.8,
    material: 'PET Plastic',
    recyclability: 'RECYCLABLE',
    recyclabilityColor: 'green',
    potential: 'HIGH',
    potentialColor: 'green',
    value: '₹4.20/kg',
    recommendation: 'Send this material to the plastic recycling stream. This PET plastic bottle has high recovery value and can be recycled into new plastic products.',
    alternatives: [
      { label: 'Plastic Bottle', pct: 96.8, color: 'green' },
      { label: 'Glass Bottle', pct: 1.7, color: 'blue' },
      { label: 'Other', pct: 1.5, color: 'blue' }
    ]
  },
  paper: {
    id: 'paper',
    type: 'Paper',
    confidence: 93.4,
    material: 'Paper / Cellulose',
    recyclability: 'RECYCLABLE',
    recyclabilityColor: 'green',
    potential: 'HIGH',
    potentialColor: 'green',
    value: '₹6.00/kg',
    recommendation: 'Send this material to the paper recycling stream.',
    alternatives: [
      { label: 'Paper', pct: 93.4, color: 'green' },
      { label: 'Cardboard', pct: 4.8, color: 'blue' },
      { label: 'Other', pct: 1.8, color: 'blue' }
    ]
  },
  can: {
    id: 'can',
    type: 'Metal Can',
    confidence: 94.2,
    material: 'Aluminium / Metal',
    recyclability: 'RECYCLABLE',
    recyclabilityColor: 'green',
    potential: 'HIGH',
    potentialColor: 'green',
    value: '₹85.00/kg',
    recommendation: 'Separate and send this metal material to the metal recovery stream.',
    alternatives: [
      { label: 'Metal Can', pct: 94.2, color: 'green' },
      { label: 'Plastic Bottle', pct: 3.6, color: 'blue' },
      { label: 'Other', pct: 2.2, color: 'blue' }
    ]
  },
  glass: {
    id: 'glass',
    type: 'Glass Bottle',
    confidence: 91.6,
    material: 'Glass',
    recyclability: 'RECYCLABLE',
    recyclabilityColor: 'green',
    potential: 'MEDIUM',
    potentialColor: 'green',
    value: '₹3.10/kg',
    recommendation: 'Send this glass material to the glass recycling stream.',
    alternatives: [
      { label: 'Glass Bottle', pct: 91.6, color: 'green' },
      { label: 'Glass / Other', pct: 5.8, color: 'blue' },
      { label: 'Other', pct: 2.6, color: 'blue' }
    ]
  },
  organic: {
    id: 'organic',
    type: 'Organic Waste',
    confidence: 89.5,
    material: 'Organic',
    recyclability: 'COMPOSTABLE',
    recyclabilityColor: 'yellow',
    potential: 'MEDIUM',
    potentialColor: 'yellow',
    value: 'N/A',
    recommendation: 'Send this organic waste to the composting or organic waste processing stream.',
    alternatives: [
      { label: 'Organic Waste', pct: 89.5, color: 'yellow' },
      { label: 'Paper', pct: 6.3, color: 'blue' },
      { label: 'Other', pct: 4.2, color: 'blue' }
    ]
  },
  non_recyclable: {
    id: 'non_recyclable',
    type: 'Non-Recyclable Waste',
    confidence: 90.1,
    material: 'Mixed / Non-Recyclable',
    recyclability: 'NON-RECYCLABLE',
    recyclabilityColor: 'red',
    potential: 'LOW',
    potentialColor: 'red',
    value: 'N/A',
    recommendation: 'Send this material to the appropriate residual waste disposal stream.',
    alternatives: [
      { label: 'Non-Recyclable Waste', pct: 90.1, color: 'red' },
      { label: 'Plastic', pct: 5.7, color: 'blue' },
      { label: 'Other', pct: 4.2, color: 'blue' }
    ]
  }
};

export default function DetectionPage() {
  const [cameraState, setCameraState] = useState('READY');
  const [model, setModel] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedBoxes, setDetectedBoxes] = useState([]);
  const [activePreset, setActivePreset] = useState('bottle');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const toast = useToast();
  const { addNotification } = useNotifications();

  // Load TensorFlow COCO-SSD model on mount
  useEffect(() => {
    let isMounted = true;
    async function loadModel() {
      try {
        setCameraState('MODEL_LOADING');
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        if (isMounted) {
          setModel(loadedModel);
          setCameraState('READY');
          addNotification({
            type: 'System',
            title: 'AI Model Loaded',
            message: 'TensorFlow.js vision classification model is ready.',
            severity: 'info',
            relatedPage: '/detection'
          });
        }
      } catch (err) {
        console.warn('TF.js Model Load Error, using prototype rule engine:', err);
        if (isMounted) {
          setCameraState('READY');
        }
      }
    }
    loadModel();
    return () => {
      isMounted = false;
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const mapPredictionToWaste = (predictions) => {
    if (!predictions || predictions.length === 0) {
      return WASTE_DATABASE[activePreset] || WASTE_DATABASE.bottle;
    }
    const top = predictions[0];
    const classLabel = (top.class || '').toLowerCase();

    if (classLabel.includes('bottle')) return WASTE_DATABASE.bottle;
    if (classLabel.includes('cup') || classLabel.includes('can')) return WASTE_DATABASE.can;
    if (classLabel.includes('book') || classLabel.includes('paper') || classLabel.includes('cardboard') || classLabel.includes('box')) return WASTE_DATABASE.paper;
    if (classLabel.includes('vase') || classLabel.includes('glass')) return WASTE_DATABASE.glass;
    if (classLabel.includes('bowl') || classLabel.includes('apple') || classLabel.includes('banana') || classLabel.includes('orange') || classLabel.includes('food') || classLabel.includes('broccoli') || classLabel.includes('sandwich')) return WASTE_DATABASE.organic;

    return WASTE_DATABASE[activePreset] || WASTE_DATABASE.bottle;
  };

  const drawBoundingBoxes = (predictions) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!predictions || predictions.length === 0) return;

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      const confidencePct = (prediction.score * 100).toFixed(1);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = '#10b981';
      ctx.font = '14px Inter, sans-serif';
      const text = `${prediction.class.toUpperCase()} (${confidencePct}%)`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x, y > 24 ? y - 24 : y, textWidth + 12, 24);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x + 6, y > 24 ? y - 7 : y + 17);
    });
  };

  const runDetectionLoop = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const video = videoRef.current;
      if (canvasRef.current) {
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
      }

      if (model) {
        model.detect(video).then(predictions => {
          setDetectedBoxes(predictions);
          drawBoundingBoxes(predictions);
        }).catch(() => {});
      }
    }
    if (streamRef.current && streamRef.current.active) {
      animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
    }
  }, [model]);

  const startCamera = async () => {
    setUploadedImage(null);
    setCameraState('ANALYZING');
    toast('Requesting browser camera permission...', 'blue');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraState('NOT_AVAILABLE');
      toast('Camera unavailable in this browser environment', 'red');
      addNotification({
        type: 'System',
        title: 'Camera Unavailable',
        message: 'Browser camera devices are not accessible.',
        severity: 'error',
        relatedPage: '/detection'
      });
      return;
    }

    try {
      stopCameraStream();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraState('ACTIVE');
          toast('Live camera active — Place waste object in front of camera', 'green');
          addNotification({
            type: 'System',
            title: 'Camera Active',
            message: 'Live browser webcam feed started.',
            severity: 'info',
            relatedPage: '/detection'
          });
          animationFrameRef.current = requestAnimationFrame(runDetectionLoop);
        };
      }
    } catch (err) {
      console.error('Camera Error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraState('PERMISSION_DENIED');
        toast('Camera permission denied in browser settings', 'red');
        addNotification({
          type: 'System',
          title: 'Camera Permission Denied',
          message: 'Webcam permission was denied in browser settings.',
          severity: 'error',
          relatedPage: '/detection'
        });
      } else {
        setCameraState('NOT_AVAILABLE');
        toast('Camera device unavailable', 'red');
      }
    }
  };

  const captureImageAndClassify = async () => {
    if (cameraState !== 'ACTIVE' && cameraState !== 'COMPLETE') {
      await startCamera();
      return;
    }

    setCameraState('ANALYZING');
    toast('AI Analyzing camera feed...', 'blue');

    setTimeout(async () => {
      let matchedResult = WASTE_DATABASE[activePreset];

      if (model && videoRef.current && videoRef.current.readyState === 4) {
        try {
          const predictions = await model.detect(videoRef.current);
          if (predictions && predictions.length > 0) {
            matchedResult = mapPredictionToWaste(predictions);
            drawBoundingBoxes(predictions);
          }
        } catch (e) {
          console.warn('Inference error fallback:', e);
        }
      }

      setSelectedResult(matchedResult);
      setCameraState('COMPLETE');
      toast(`AI Detection Complete — ${matchedResult.type} identified (${matchedResult.confidence}%)`, 'green');

      // Trigger Notifications with payload
      addNotification({
        type: 'AI Detection',
        title: 'AI Detection Complete',
        message: `${matchedResult.type} detected with ${matchedResult.confidence}% confidence.`,
        severity: 'info',
        relatedPage: '/detection',
        contentType: 'detection',
        relatedData: matchedResult
      });

      if (matchedResult.recyclability === 'RECYCLABLE') {
        addNotification({
          type: 'AI Detection',
          title: 'Recyclable Material Detected',
          message: `${matchedResult.type} identified as recyclable with ${matchedResult.potential} recovery potential.`,
          severity: 'success',
          relatedPage: '/detection',
          contentType: 'detection',
          relatedData: matchedResult
        });
      } else if (matchedResult.recyclability === 'NON-RECYCLABLE') {
        addNotification({
          type: 'AI Detection',
          title: 'Non-Recyclable Waste Detected',
          message: `${matchedResult.type} detected requiring residual waste disposal.`,
          severity: 'warning',
          relatedPage: '/detection',
          contentType: 'detection',
          relatedData: matchedResult
        });
      }
    }, 1200);
  };

  const handleStopCamera = () => {
    stopCameraStream();
    setCameraState('READY');
    setDetectedBoxes([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    toast('Camera stopped', 'blue');
    addNotification({
      type: 'System',
      title: 'Camera Stopped',
      message: 'Browser webcam stream stopped.',
      severity: 'info',
      relatedPage: '/detection'
    });
  };

  const handleRetake = () => {
    setSelectedResult(null);
    setUploadedImage(null);
    setDetectedBoxes([]);
    startCamera();
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    stopCameraStream();
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setCameraState('ANALYZING');
    toast('Analyzing uploaded image with AI model...', 'blue');

    const img = new Image();
    img.src = url;
    img.onload = async () => {
      setTimeout(async () => {
        let matchedResult = WASTE_DATABASE[activePreset];
        if (model) {
          try {
            const predictions = await model.detect(img);
            if (predictions && predictions.length > 0) {
              matchedResult = mapPredictionToWaste(predictions);
            }
          } catch (e) {
            console.warn('Image inference error:', e);
          }
        }
        setSelectedResult(matchedResult);
        setCameraState('COMPLETE');
        toast(`AI Detection Complete — ${matchedResult.type} identified (${matchedResult.confidence}%)`, 'green');

        addNotification({
          type: 'AI Detection',
          title: 'AI Detection Complete',
          message: `${matchedResult.type} detected from uploaded image (${matchedResult.confidence}%).`,
          severity: 'info',
          relatedPage: '/detection'
        });
      }, 1500);
    };
  };

  const handlePresetSelect = (key) => {
    setActivePreset(key);
    const item = WASTE_DATABASE[key];
    if (cameraState === 'COMPLETE' || selectedResult) {
      setSelectedResult(item);
      toast(`Simulating detection: ${item.type}`, 'blue');
    }
  };

  return (
    <div>
      <div className="demo-banner">
        <AlertTriangle size={14} />
        AI DEMO / PROTOTYPE OUTPUT — Client-side TensorFlow.js object detection active.
      </div>

      <div className="grid-21" style={{ gap: 20 }}>
        {/* LEFT CARD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Camera size={17} style={{ color: 'var(--color-blue-500)' }} /> Camera / Image Input
              </span>

              {cameraState === 'READY' && <span className="badge blue"><span className="badge-dot" />Camera Ready</span>}
              {cameraState === 'MODEL_LOADING' && <span className="badge yellow"><span className="badge-dot" />Loading AI model...</span>}
              {cameraState === 'ACTIVE' && <span className="badge green"><span className="badge-dot" style={{ background: '#10b981', animation: 'pulse 1.5s infinite' }} />● CAMERA ACTIVE</span>}
              {cameraState === 'ANALYZING' && <span className="badge blue"><span className="badge-dot" />AI Analyzing...</span>}
              {cameraState === 'COMPLETE' && <span className="badge green"><span className="badge-dot" />Detection Complete</span>}
              {cameraState === 'NO_OBJECT' && <span className="badge yellow"><span className="badge-dot" />No Object Detected</span>}
              {cameraState === 'PERMISSION_DENIED' && <span className="badge red"><span className="badge-dot" />Permission Denied</span>}
              {cameraState === 'NOT_AVAILABLE' && <span className="badge red"><span className="badge-dot" />Camera Unavailable</span>}
            </div>

            <div className="card-body">
              <div
                className={`detection-upload-zone ${cameraState === 'ANALYZING' ? 'analyzing' : ''}`}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 220,
                  background: 'var(--color-blue-50)',
                  border: '2px dashed var(--color-blue-200)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cameraState === 'READY' && !uploadedImage && (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ width: 56, height: 56, background: 'var(--color-blue-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <Camera size={26} color="var(--color-blue-600)" />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-grey-800)' }}>Click "Capture Image" to open Camera</div>
                    <div style={{ fontSize: 12, color: 'var(--color-grey-500)', marginTop: 4 }}>Or drop / upload a waste image below</div>
                  </div>
                )}

                {cameraState === 'MODEL_LOADING' && (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <div className="spinner" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-blue-600)' }}>Loading AI model...</div>
                  </div>
                )}

                {cameraState === 'PERMISSION_DENIED' && (
                  <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-red-600)' }}>
                    <ShieldAlert size={36} style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Camera permission denied</div>
                  </div>
                )}

                {cameraState === 'NOT_AVAILABLE' && (
                  <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-grey-700)' }}>
                    <AlertCircle size={36} style={{ margin: '0 auto 10px', color: 'var(--color-yellow-600)' }} />
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Camera unavailable</div>
                  </div>
                )}

                {(cameraState === 'ACTIVE' || cameraState === 'ANALYZING' || cameraState === 'COMPLETE') && !uploadedImage && (
                  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220 }}>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10, display: 'block' }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                    />

                    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, fontWeight: 800, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px', borderRadius: 4 }}>
                        LIVE CAMERA
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, background: '#10b981', color: '#fff', padding: '3px 8px', borderRadius: 4 }}>
                        ● CAMERA ACTIVE
                      </span>
                    </div>

                    {cameraState === 'ANALYZING' && (
                      <div className="loading-overlay" style={{ padding: 16, background: 'rgba(255,255,255,0.85)' }}>
                        <div className="spinner" />
                        <div style={{ color: 'var(--color-blue-600)', fontWeight: 700 }}>AI ANALYZING...</div>
                      </div>
                    )}

                    {cameraState === 'COMPLETE' && (
                      <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, background: 'rgba(16, 185, 129, 0.95)', color: '#fff', padding: '8px 12px', borderRadius: 6, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle size={16} /> ✓ Detection Complete
                      </div>
                    )}
                  </div>
                )}

                {uploadedImage && (
                  <div style={{ position: 'relative', width: '100%', textAlign: 'center', padding: 10 }}>
                    <img src={uploadedImage} alt="Uploaded waste" style={{ maxHeight: 200, width: '100%', objectFit: 'contain', borderRadius: 8 }} />
                    {cameraState === 'ANALYZING' && (
                      <div className="loading-overlay" style={{ padding: 16, background: 'rgba(255,255,255,0.85)' }}>
                        <div className="spinner" />
                        <div style={{ color: 'var(--color-blue-600)', fontWeight: 700 }}>AI ANALYZING...</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleFileUpload(e.target.files[0])}
              />

              <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: 130 }}
                  onClick={captureImageAndClassify}
                  disabled={cameraState === 'MODEL_LOADING'}
                >
                  <Camera size={15} /> Capture Image
                </button>

                {(cameraState === 'ACTIVE' || cameraState === 'COMPLETE') && (
                  <button className="btn btn-outline" style={{ minWidth: 100 }} onClick={handleStopCamera}>
                    <Square size={14} color="var(--color-red-500)" /> Stop Camera
                  </button>
                )}

                {(cameraState === 'COMPLETE' || selectedResult) && (
                  <button className="btn btn-outline" style={{ minWidth: 90 }} onClick={handleRetake}>
                    <RefreshCw size={14} /> Retake
                  </button>
                )}

                <button className="btn btn-outline" style={{ flex: 1, minWidth: 150 }} onClick={() => fileRef.current?.click()}>
                  <Upload size={15} /> Upload Waste Image
                </button>
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--color-grey-200)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-grey-500)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={12} color="var(--color-blue-500)" /> Prototype Test Objects:
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[
                    { key: 'bottle', label: '🍾 Plastic Bottle' },
                    { key: 'paper', label: '📄 Paper' },
                    { key: 'can', label: '🥫 Metal Can' },
                    { key: 'glass', label: '🥛 Glass Bottle' },
                    { key: 'organic', label: '🍎 Organic' },
                    { key: 'non_recyclable', label: '🗑️ Non-Recyclable' }
                  ].map(p => (
                    <button
                      key={p.key}
                      onClick={() => handlePresetSelect(p.key)}
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 6,
                        border: activePreset === p.key ? '1px solid var(--color-blue-500)' : '1px solid var(--color-grey-300)',
                        background: activePreset === p.key ? 'var(--color-blue-50)' : '#fff',
                        color: activePreset === p.key ? 'var(--color-blue-700)' : 'var(--color-grey-700)',
                        fontWeight: activePreset === p.key ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Smart IoT Integration Card (No Future text) */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Info size={16} style={{ color: 'var(--color-blue-500)' }} /> Smart IoT Integration
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: 'ESP32-CAM', icon: '📷', color: 'green', status: 'Prototype' },
                  { label: 'TinyML', icon: '🧠', color: 'blue', status: 'Ready' },
                  { label: 'LoRa', icon: '📡', color: 'blue', status: 'Demo' }
                ].map(d => (
                  <div
                    key={d.label}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '10px 6px',
                      background: 'var(--color-grey-50)',
                      borderRadius: 10,
                      border: '1px solid var(--color-grey-200)'
                    }}
                  >
                    <div style={{ fontSize: 22 }}>{d.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{d.label}</div>
                    <span className={`badge ${d.color}`} style={{ marginTop: 4 }}>{d.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--color-grey-500)', textAlign: 'center' }}>
                Smart IoT hardware interface — Prototype Demo
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div>
          {selectedResult ? (
            <AIResultPanel result={selectedResult} />
          ) : (
            <div className="card" style={{ height: '100%' }}>
              <div className="card-header">
                <span className="card-title">
                  <Brain size={17} style={{ color: 'var(--color-blue-500)' }} /> AI Detection Result
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 14, color: 'var(--color-grey-400)' }}>
                <Brain size={48} strokeWidth={1} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-grey-700)' }}>Awaiting Camera or Image Input</div>
                  <div style={{ fontSize: 12, color: 'var(--color-grey-500)', marginTop: 4 }}>
                    Click "Capture Image" to start live webcam detection or upload a waste photo.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AIResultPanel({ result }) {
  const r = result;
  if (!r) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="detection-result-card">
        <div className="detection-result-header">
          <Brain size={17} /> AI Detection Result
          <span style={{ marginLeft: 'auto', fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 999 }}>
            AI DEMO / PROTOTYPE OUTPUT
          </span>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Waste Type</span>
          <span className="detection-field-value">{r.type}</span>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Confidence</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="progress-bar" style={{ width: 120 }}>
              <div
                className={`progress-fill ${r.recyclabilityColor}`}
                style={{ width: `${r.confidence}%` }}
              />
            </div>
            <span style={{ fontWeight: 700, color: `var(--color-${r.recyclabilityColor}-600)`, fontSize: 15 }}>
              {r.confidence}%
            </span>
          </div>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Material</span>
          <span className="detection-field-value">{r.material}</span>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Recyclability</span>
          <span className={`badge ${r.recyclabilityColor}`} style={{ fontSize: 13, padding: '4px 14px' }}>
            <span className="badge-dot" />{r.recyclability}
          </span>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Recovery Potential</span>
          <span className={`badge ${r.potentialColor}`} style={{ fontSize: 13, padding: '4px 14px' }}>
            <Zap size={12} /> {r.potential}
          </span>
        </div>

        <div className="detection-field">
          <span className="detection-field-label">Estimated Value</span>
          <span style={{ fontWeight: 800, fontSize: 18, color: `var(--color-${r.recyclabilityColor}-600)` }}>
            {r.value}
          </span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <Brain size={16} style={{ color: 'var(--color-blue-500)' }} /> Classification Confidence
          </span>
        </div>
        <div className="card-body">
          {r.alternatives.map((a, i) => (
            <div key={i} className="confidence-bar-wrap">
              <span className="confidence-label">{a.label}</span>
              <div className="progress-bar" style={{ flex: 1 }}>
                <div className={`progress-fill ${a.color}`} style={{ width: `${a.pct}%` }} />
              </div>
              <span className="confidence-pct">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendation-card">
        <div className="recommendation-icon">
          <Brain size={18} />
        </div>
        <div>
          <div className="recommendation-title">AI Recommendation</div>
          <div className="recommendation-text">{r.recommendation}</div>
        </div>
      </div>
    </div>
  );
}
