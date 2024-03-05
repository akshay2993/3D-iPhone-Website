import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    CanvasSnipperPlugin,
    addBasePlugins,
    mobileAndTabletCheck
} from "webgi";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WebGiViewer = () => {
    const canvasRef = useRef(null)

    const setupViewer = useCallback(async () => {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })

        // Add plugins individually.
        // await viewer.addPlugin(GBufferPlugin)
        // await viewer.addPlugin(new ProgressivePlugin(32))
        // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
        // await viewer.addPlugin(GammaCorrectionPlugin)
        // await viewer.addPlugin(SSRPlugin)
        // await viewer.addPlugin(SSAOPlugin)
        // await viewer.addPlugin(DiamondPlugin)
        // await viewer.addPlugin(FrameFadePlugin)
        // await viewer.addPlugin(GLTFAnimationPlugin)
        // await viewer.addPlugin(GroundPlugin)
        // await viewer.addPlugin(BloomPlugin)
        // await viewer.addPlugin(TemporalAAPlugin)
        // await viewer.addPlugin(AnisotropyPlugin)
        // and many more...
        
        // or use this to add all main ones at once.
        await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

        const manager = await viewer.addPlugin(AssetManagerPlugin)
        await viewer.addPlugin(TonemapPlugin)
    
        // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
        await viewer.addPlugin(CanvasSnipperPlugin)
        
        viewer.renderer.refreshPipeline()
        // Import and add a GLB file.
        await manager.addFromPath("scene-black.glb")
    }, [])
    
    useEffect(() => {
        setupViewer()
    }, [])

    return (
        <div className='webgi-canvas-container'>
            <canvas id='webgi-canvas' ref={canvasRef} />
        </div>
    )
}

export default WebGiViewer
