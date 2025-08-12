const express=require('express');
const cors=require('cors');

const app=express();
const PORT=3000;

//middleware
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.path}`);
    next();
});

//routes
app.get('/',(req,res)=>{
    res.json({
        message:'Welcome to CodeArena API',
        status:'server is running perfectly',
        version: '1.0.0',
        timestamp:new Date().toISOString()
    })
})

app.get('/health',(req,res)=>{
    res.json({
        status:'Healthy',
        uptime:`${Math.floor(process.uptime())} seconds`,
        memory:`${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`
    });
});

app.get('/api/test',(req,res)=>{
    res.json({
        message:'test endpoint is working',
        method:req.method,
        path:req.path,
        query:req.query
    });
});

app.use('*',(req,res)=>{
    res.status(404).json({
        error:'route not found',
        path:req.originalUrl,
        message:'this endpoint does not exist'

    });
});

app.use((err,req,res,next)=>{
    console.error('server error',err.stack);
    res.status(500).json({
        error:"internal server error:",
        message:'somethibngf went wrong on our end'
    });
});


//start server
app.listen(PORT,()=>{
    console.log("CodeArena backend is working");
});

//graceful shutdown
process.on('SIGINT',()=>{
    console.log('server is shutting down gracefully');
    process.exit(0);
});

