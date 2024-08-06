import { useEffect, useState } from "react";

const Translate = () => {


    const LanguageList =[
        {id:'ta',name:'Tamil'},
        {id:'te',name:'Telugu'},
        {id:'hi',name:'Hindi'},
        {id:'en',name:'English'}
    ]
        
    const [initialLang, setInitialLang] = useState('English');
    const [translateLang, setTranslateLang] = useState('Hindi');
    const   [opt,setOpt] = useState([]);
    const [initalText , setIntialText] = useState('Hi Hello');
    const [finalText ,  setFinalText ] = useState('');

    useEffect(()=>{
        setFinalText('')
        if(initialLang){
            setTranslateLang('')
            const full = LanguageList.filter((item:any)=> item.name !== initialLang)
            setOpt(full);
        }
    },[initialLang]);

    const handleInterchange = () =>{
        //swap languages
        let intial = initialLang;
        setInitialLang(translateLang);
        setTranslateLang(intial)
    }

    const handleSubmit = async () =>{
       var myHeaders = new Headers();
       myHeaders.append("apikey", "l6dptoMtWQRczhZ2jYgQo1Rr4TYpcgnK");
       
       var raw = initalText;
       const language = LanguageList.find((item) => item.name === translateLang);
       const sourceLang = LanguageList.find((item) => item.name === initialLang).id || '';
       const code = language ? language.id : null;       
       var requestOptions = {
         method: 'POST',
         redirect: 'follow',
         headers: myHeaders,
         body: raw
       };
       
       try {
        const response = await fetch(`https://api.apilayer.com/language_translation/translate?target=${code}&source=${sourceLang}`, requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const translatedText = JSON.parse(`"${result.translations[0].translation}"`);
        setFinalText(translatedText);
      } catch (error) {
        console.log('error', error);
        
      }
    }
    
    
    return (
        <>
            <div className="flex justify-center items-center font-serif font-semibold text-lg bg-blue-300 py-3">
        <h2>Language Translator</h2>
      </div>
      <div className="p-4 flex justify-center">
        <div className="mb-4 pr-50 pt-4">
          <select value={initialLang} onChange={(e) => setInitialLang(e.target.value)} className="w-full pt-3 pb-3 pl-10 pr-10">
            <option>Select Language</option>
            {LanguageList.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
        <img alt='interchange' onClick={handleInterchange} className="w-8 m-5 cursor-pointer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///8AAACdnZ2Xl5crKyuOjo6CgoKIiIiLi4uUlJSFhYV7e3t/f3+KioqWlpaRkZELCwvNzc0ZGRkRERGwOgkjAAADnElEQVR4nO3cgVLyMBAEYA+wKCAIvv+7+uOviJAmHee2t1lvH4DJN5drS9rk4SGTyWQymUwmk8lkMplMJpPJZDIZxjxGDwCe1230CNBZmTpxZbaLHgM2/4TiVTwLtav4IZQm/hcqEz+FwsQvoS7xIrQheiigfAtVq3glFK3itVCT+ENom+jhAPJTqFjFG6Eg8VaoN1HvhHLEe6EasSAUI5aE9hI9Ks8UhVJVLAttHT0uv4wIhYhjQp1eHBXKVHFcqEKsCO0penAuqQk1erEqlKhiXahQxYbQ+n+/2BL2P1Gbwu6r2Bb2TpwgnIl4PCwR2Z8mCOchLqeMBJY5iItQoR3khTNUMVqIr2K4EE6MF9qzvBBcRQYhlkghhE5UDiGSSCIEElmEtpcXLtWFCxSQRQirIIsQCOQQQp/bGITIClIIsUACIfivRbwQDQwXwh5lWIR44B9YTTwuF5BMWhGG9yAyU1b1uwZOEc6wGoxMvl3rvYJtYffAlrD7d9wtYe89eE5VqACsCiWAf/rLPY0KVoSOwNg7zpjQ8YO27Zvfb/0i+C/Zt7by+7FfpCx0vNHvjFHoCByMUei4Q29rjELHHtwZo9DxKjoYo9Bxy9MnkEzo3YN0Qsce3BijEAJkEjpO0cEYhSAgj9DxKro2RiEMyCJ0PPBrMEahYw9ujFHoCHy5BVIIHY8XWt8BGYTAHuQQOk7RpwIwXug4RYvAcKHjFC30YLzwzRF4fxVlEDqu1j6OAIOFfhkFqghHelBHOF5BEWENKCGsAhWE5Ru9kPBQB/YvbAG7F9Z7UEDYrGDvwuc2sG/hFKCdMB//Lo8zANs9iAx4A8g5+1AgcB8dCRAvnNSDPQvDgWhh7AaQGYQEQKwwfooaVshQQaiQA6i/rxwnJKkgUBj9KHMJbpZSXEgNeqUhISLvFhxE6B1/wtoFPtinNgYi+MmbYKKi/z3FVxH+DziciF/FiF2HmkMYXcUZhPqriROJpz3khODDHCvC04hdr+pPInYu1H+71nzHLSBsVrF/4egHbTrCxkRVENarKCGsVlFDqP/lXo2oIhzvRRnhaBV1hJxfsvvmbsuTnLDci1LCYhW1hCWimLBAVBOy7bBEhGuXLCSDvPBmoioKmU4cQIXn1AhYdvLCqyqqCr+rKCu8EHWFX0RhIcVpZuDs5IUfB35pC+NPhsQn+nTPGbJ9jR4BPConEmcymUwmk8lkMplMJpPJZDKZTEYt76ncMMmXzeg+AAAAAElFTkSuQmCC"></img>
        <div className="mb-4 pr-50 pt-4">
          <select value={translateLang} onChange={(e) => setTranslateLang(e.target.value)} className="w-full pt-3 pb-3 pl-10 pr-10">
            <option>Select Language</option>
            {opt.map(item => (
              <option key={item.id} value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mr-3 border w-[20%] h-[300px]">
          {/* intial text */}
          <textarea 
            className="w-full h-full"
            value={initalText}
            onChange={(e) => setIntialText(e.target.value)}
          />
        </div>
        <div className="border w-[20%] h-[300px]">
          {/* final text */}
          <textarea 
            className="w-full h-full bg-gray-100" 
            value={finalText}
            onChange={(e) => setFinalText(e.target.value)}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex justify-center items-center border mt-5 w-[42%] ml-[29%] pt-2 pb-2 cursor-pointer bg-blue-300" onClick={handleSubmit}> 
        <button>Convert</button>
      </div>        </>
    );
}

export default Translate;
