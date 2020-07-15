import React,{useState,useEffect} from 'react';
import {Mapping} from '../json/mapping';
import {Data} from '../json/data';

export default function Diffdata({Second}){
const [data,setData] = useState([]);

function approve(e){
    console.log(e.target)
}
function fetchData(){

  for (let i = 0; i < Mapping.length; i++) {
    let path = Mapping[i]["path"].split("/"), arr=[];
        for(let j=1;j<path.length;j++){
            arr.push(path[j]); 
        }
    if(arr.length==2){
      if (Mapping[i].op == "add") {
        Data[arr[0]].push(`<span class='green'>${JSON.stringify(Mapping[i].value)}</span><span >Aprove</span>/<span>Reject</span>`);
      }
      if (Mapping[i].op == "replace") {
        Data[arr[0]][arr[1]]= `<span class='red'><del>${Data[arr[0]][arr[1]]}</del></span> <span class='green'>${Mapping[i].value}</span> <span>Aprove</span>/<span>Reject</span>`;
      }
    }
    if(arr.length==1){
      if (Mapping[i].op == "add") {
        Data[path[1]]=`<span class='green'>${Mapping[i].value}</span> <span>Aprove</span>/<span>Reject</span>`;
      }
      if (Mapping[i].op == "replace") {
        Data[arr[0]]= `<span class='red'><del>${Data[arr[0]]}</del></span> <span class='green'>${Mapping[i].value}</span> <span>Aprove</span>/<span>Reject</span>`;
      }
    }
    if(arr.length==3){
      if (Mapping[i].op == "add") {
        Data[arr[0]][arr[1]].push(Mapping[i].value)
      }
      if (Mapping[i].op == "replace") {
        Data[arr[0]][arr[1]][arr[2]]= `<span class='red'><del>${Data[arr[0]][arr[1]][arr[2]]}</del></span> <span class='green'>${Mapping[i].value}</span> <span>Aprove</span>/<span>Reject</span>`;
      }
    }
  }
  console.log(Data);
    setData(JSON.stringify(Data, undefined, 2))
}
  useEffect(()=>{
    fetchData();
  },[])
    return(
        <div>
            <div>
                <a>Approve</a> | <a>Reject</a>
            </div>
            <pre><div dangerouslySetInnerHTML={ { __html: data } }></div></pre>
        </div>
    )
}