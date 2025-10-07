import './App.css';
import * as React from "react";

// Material UI components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

// External libraries
import { useTranslation } from 'react-i18next';
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

// Redux RTK Query import
import { useGetWeatherQuery } from "./weatherApiSlice";

function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocal] = React.useState("en");
  const [dateAndTime, setDateAndTime] = React.useState("");

  //  Call the API using RTK Query instead of axios
  const { data, error, isLoading } = useGetWeatherQuery();

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

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", color: "red" }}>Error fetching weather data</h2>;

  //  Prepare weather data
  const responseTemp = Math.round(data.main.temp - 273.15);
  const responseTempMin = Math.round(data.main.temp_min - 273.15);
  const responseTempMax = Math.round(data.main.temp_max - 273.15);
  const responseDiscription = data.weather[0].description;
  const responseIcon = data.weather[0].icon;

  const temp = {
    temp: responseTemp,
    description: responseDiscription,
    tempMin: responseTempMin,
    tempMax: responseTempMax,
    icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
  };

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <div dir={locale === "ar" ? "rtl" : "ltr"}
            style={{ backgroundColor: "#7e99a3", color: "white", borderRadius: "20px", padding: "5px 10px", width: "100%" }}>
            <div>
              <div dir={locale === "ar" ? "rtl" : "ltr"} style={{ display: "flex", justifyContent: "start", alignItems: "end" }}>
                <Typography variant="h2" style={{ marginRight: "30px", fontWeight: "600" }}>
                  {t("cairo")}
                </Typography>
                <Typography variant="h5">{dateAndTime}</Typography>
              </div>

              <hr />
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h1">{temp.temp}</Typography>
                    <img src={temp.icon} alt="" />
                  </div>

                  <Typography variant="h6">{t(temp.description)}</Typography>

                  <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <h4>{t("min")}: {temp.tempMin}</h4>
                    <h4>|</h4>
                    <h4>{t("max")}: {temp.tempMax}</h4>
                  </div>
                </div>

                <CloudIcon style={{ fontSize: "200px" }} />
              </div>
            </div>
          </div>

          <div dir={locale === "ar" ? "rtl" : "ltr"} style={{ width: "100%" }}>
            <Button onClick={handleLanguageClick} variant="text"
              style={{ color: "#de6262", fontSize: "20px", textAlign: "left" }}>
              {locale === "en" ? "Arabic" : "English"}
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
