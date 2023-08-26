var prediction_1=""
var prediction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach("#camera")
function Takesnapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("selfie_image").src=data_uri    
    })
}
console.log("ml5version=",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/WYoVEBK93/model.json",modelloaded)
function moddelloaded(){
    console.log("model.loaded")
}
function speak(){
    var synth=windows.speechSynthesis
    speak_data_1="The first prediction is" + prediction_1;
    speak_data_2="And the second prediction is" + prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis);
}   
function Check(){
    img=document.getElementById("selfie_image")
    classifier.classify(img,gotresult)
  }
  function gotresult(error,results){
   if (error) {
     console.log(error) 
   } else {
      console.log(results)
      document.getElementById("result_emotion_name").innerHTML=results[0].label
      document.getElementById("result_emotion_name2").innerHTML=results[1].label
      prediction_1=results[0].label
      prediction_2=results[1].label
      speak()
      if (prediction_1=="Happy") {
         document.getElementById("update_emoji").innerHTML="&#128516;"
      }
      if (prediction_1=="Angry") {
          document.getElementById("update_emoji").innerHTML="&#128545;"
       }
       if (prediction_1=="Sad") {
          document.getElementById("update_emoji").innerHTML="&#128532;"
       }
       if (prediction_2=="Happy") {
          document.getElementById("update_emoji2").innerHTML="&#128516;"
       }
       if (prediction_2=="Angry") {
           document.getElementById("update_emoji2").innerHTML="&#128545;"
        }
        if (prediction_2=="Sad") {
           document.getElementById("update_emoji2").innerHTML="&#128532;"
        }
   }    
  }