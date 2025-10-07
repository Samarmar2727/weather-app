
import * as React from "react"
 import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from "axios"
//import moment from "moment"
//import "moment/min/locales"
import { useTranslation } from 'react-i18next';
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

import './App.css'

//redux import 
 import{useSelector, useDispatch} from "react-redux";


function App() {
// redux call 
const dispatch = useDispatch();

const result = useSelector((state)=>{
  console.log("this is the", state)
  return state.result
})
  const { t, i18n } = useTranslation();
  const[locale, setLocal] = React.useState("en")
  const [dateAndTime, setDateAndTime] = React.useState("")
  const [temp, setTemp] = React.useState({
    temp:null,
    description:"", 
    tempMin : null,
    tempMax :null,
    icon:null
  })

  function formatDate(lang) {
    const currentDate = new Date();
    const localeSetting = lang === "ar" ? ar : enUS;
  
    return format(currentDate, "EEEE | MMMM do yyyy | h:mm:ss a", {
      locale: localeSetting,
    });
  }

  function handleLanguageClick() {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocal(newLocale);
    i18n.changeLanguage(newLocale);
  
    const formattedDate = formatDate(newLocale);
    setDateAndTime(formattedDate);
  }
  
  React.useEffect(() => {
    const formattedDate = formatDate(locale);
    setDateAndTime(formattedDate);
  }, [locale]);

    
  let cancelAxios = null
  React.useEffect(() => {
    i18n.changeLanguage(locale)
  axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.044420&lon=31.235712&appid=2605a582f805a3f5d0d757c43e065b16',
    {
      cancelToken:new axios.CancelToken((cancel) =>{
        cancelAxios = cancel;
      })
    }
  )
  .then(function (response) {
   const responseTemp = Math.round(response.data.main.temp -273.15)
   const responseTempMin =Math.round(response.data.main.temp_min -273.15)
   const responseTempMax = Math.round(response.data.main.temp_max -273.15)
   const responseDiscription = response.data.weather[0].description
   const responseIcon = response.data.weather[0].icon
   

  
 
     setTemp({ temp: responseTemp,
      description:responseDiscription, 
      tempMin : responseTempMin,
      tempMax :responseTempMax,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`
    })
    console.log( response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  return ()=>{
    cancelAxios()

  }

}, [])
  

  return (
    <>
    {/*container*/}
      <Container maxWidth="sm">
        {/*content Container*/}
          <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            {/*card*/}
              <div dir={locale == "ar" ? "rtl" : "ltr"}
               style={{backgroundColor:"#7e99a3", color:"white", borderRadius:"20px", padding:"5px 10px", width:"100%"}}>
                  {/*content*/}
                        <div>
                          {/*city&time*/}
                              <div dir={locale == "ar" ? "rtl" : "ltr"}
                              style={{display:"flex", justifyContent:"start", alignItems:"end" }}>
                              <Typography variant="h2" style={{marginRight:"30px", fontWeight:"600"}}>
                                 {t("cairo")}
                              </Typography>
                              <Typography variant="h5" >
                                {dateAndTime}
                              </Typography>

                              </div>
                          {/*city&time*/}
                              <hr/>
                               {/*degree&discription*/}
                              <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                                  <div>
                                     {/*temperature*/}
                                      <div style={{display:"flex", justifiyContent:"center", alignItems:"center"}}>
                                      <Typography variant="h1">
                                         {temp.temp}
                                        </Typography>
                                       <img src={temp.icon} alt="" />
                                      </div>
                                     {/*temperature*/}

                                     <Typography variant="h6">
                                    {t(temp.description)}
                                      </Typography>
                                       {/*min&max*/}
                                      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                                        <h4> {t("min")}:{temp.tempMin} </h4>
                                        <h4>|</h4>
                                        <h4>{t("max")}:{temp.tempMax}</h4>
                                      </div>
                                       {/*min&max*/}
                                  </div>
                              

                              <CloudIcon style={{fontSize:"200px"}}/>
                            </div>
                            {/*degree&discription*/}
                        </div>
                  {/*content*/}
              </div>
            {/*card*/}

            {/*transilation Container*/}
            <div dir={locale == "ar" ? "rtl" : "ltr"}
            style={{ width:"100%"}}>
              <Button onClick={handleLanguageClick} variant="text"  style={{color:"#de6262", fontSize:"20px",textAlign:"left"}}>
               {locale == "en" ? "Arabic" : "English"}
                </Button>
            </div>
             {/*transilation Container*/}
         
          </div>
       {/*content Container*/}
      </Container>
    {/*container*/}
    </>
  )
}

export default App