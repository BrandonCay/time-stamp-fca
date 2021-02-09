import React from 'react';
import {Paper} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {makeStyles, StylesProvider, withStyles} from '@material-ui/core/styles'
import'./Date.css'
/*****************************
Lessons:
//next time use css file
//Try bootstrap for easy dynamic websites or find exact coordinates of viewport to make it a fit for your monitor ~(1900px x 920px) 
//investigate axios and other fetching tech
******************************/
/*****************************
 * Problems:
 * Scrollbar
 * Text too close to side
 * 
******************************/
/*
const backgroundStyle={
    width:'5000vw',
     height:'100vh', 
     background:'linear-gradient(90deg, rgba(8,0,172,1) 0%, rgba(254,107,139,1) 25%, rgba(255,142,83,1) 50%, rgba(254,107,139,1) 75%, rgba(8,0,172,1) 100%)',
     animation:"cycle 5s infinite"
}*/

//css variables ******************
const custFont="Roboto";
const custSz='24px';

//material-ui withStyle className injection
const paperStyle={
    root:{
      background:'white',
      width:'750px',
      height:'50px',
      fontFamily:'Roboto',
      fontSize:'24px',
      verticalAlign:'middle',
    },

};

const columnStyle={
    display:'flex', 
    flexDirection:'column',
    justifyContent:'center',
    height:'100%'
}



const inputStyle={
    width:'100%',
    height:'100%', 
    background:'none', 
    border:'none', 
    fontSize:custSz, 
    outline:'none',
    fontFamily:custFont
}

const textStyle={
    width:'100%',
    height:'100%', 
    display: 'flex',
    font:'24px',
    flexDirection:'column',
    justifyContent:'center'
}

//React Component *****************
 

class Date extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:"",
            input:"",
            time:true
        }
    }

    handleKeyUp(e){ 
        if(e.charCode===13){
            const temp=e.target.value;
            console.log(typeof(temp));
            if(this.state.input!=temp || this.state.input===""){
                const url= temp===""?"/api/time-stamp-fca":`api/time-stamp-fca/${temp}`;
                console.log(url);
                fetch(url)
                .then((res)=>res.json())
                .then(date=>{
                    let string="";
                    if('error' in date)
                        string=`error: ${date.error}`;
                    else
                        string=`Unix:${date.unix}, UTC: ${date.utc}`;
                    this.setState({text:string});
                    
                })
                //console.log(this.state.text);
            }
            this.state.input=e.target.value;
            e.target.value="";
        }

    }

    render(){
        const style1=this.props.classes.root;//paperStyles is injected into style1 by withStyles
        return(
            
            <div style={{width:'100%',height:'100%'}}>
               {/*background*/}
                        <div className="backgroundStyle"> </div>
                        <div style={{flexDirection:'column', display:'flex', justifyContent:'space-between', width:'1825px',height:'450px', position:'relative',top:'230px', left:'37.5px'}}>
                            <div style={{flexDirection:'row', display:'flex', justifyContent:'center'}}>
                                <h1 style={{textAlign:"center", fontFamily:custFont, fontSize:'72px', color:'white', margin:0}}>
                                Date to UTC and Unix time Converter<br/>
                                Supported date formats are listed <a href="https://www.w3schools.com/js/js_date_formats.asp" target="_blank">here</a>
                               </h1>
                               {/*
                            <Paper className={style1}>
                                   
                                
                                    <div style={textStyle}>
                                        Doo
                                    </div>
                                </Paper>
                                */}
                            </div>
                            <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                                <Paper className={style1} square={false}>
                                    <input type='text' onKeyPress={this.handleKeyUp.bind(this)} 
                                    style={inputStyle} 
                                    placeholder='Type Date Then Press Enter to Convert'/>
                                </Paper>
                                <Paper className={style1}>
                                    <div style={textStyle}>
                                        {this.state.text}
                                    </div>
                                </Paper>
                            </div>         
                </div>
                    {/*<div style={{width:"100vw", height:"100vh", display:'flex', justifyContent:'space-evenly'}}>
                        
                        <div style={columnStyle}>
                            <Paper className={style1} square={false}>
                                {/* <TextField label='input'/>
                                <input type='text' onKeyPress={this.handleKeyUp.bind(this)} 
                                style={inputStyle} 
                                placeholder='Type Date Then Press Enter to Convert'/>
                            </Paper>
                        </div> 
                        <div style={columnStyle}> 
                            <Paper className={style1}>
                                <div style={textStyle}>
                                    {this.state.text}
                                </div>
                            </Paper>
                        </div>
                    </div>
                     */}
            </div>
        );
    }
}


export default withStyles(paperStyle)(Date);