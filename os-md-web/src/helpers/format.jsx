

//-----------------------------------------------------------------------------------------
//date
//-----------------------------------------------------------------------------------------
export const toThaiDateTimeString = (date) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:"numeric",
    minute:'numeric',
    second:"numeric",
    timeZone: "Asia/Bangkok",
    formatMatcher:'basic',
  })
 return datetoThai
};

export const toThaiTimeString = (date) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    hour:"numeric",
    minute:'numeric',
    second:"numeric",
    timeZone: "Asia/Bangkok",
    formatMatcher:'basic',
  })
 return datetoThai
};

export const toThaiDateString = (date) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    formatMatcher:'basic',
  })
 return datetoThai
};
//------------------------------------
//GoogleDrive
//------------------------------------
  const convertDriveImage = (url) => {
    //ConvertDriveLinkToDirectImage
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return ""; // or handle invalid format
  };

  const convertDriveIFrame = (url) => {
    //ConvertDriveLinkToDirectImage

    if (url) {
      const fileId = url.match(/[-\w]{25,}/)[0];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    return ""; // or handle invalid format
  };
//-----------------------------------------------------------------------------------------
//number
//-----------------------------------------------------------------------------------------
export const currencyFormat = (num)=> {
    return num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
//-----------------------------------------------------------------------------------------
//word
//-----------------------------------------------------------------------------------------
  export const lengthTextFormat = (text, maxText) => {
    return text?.length > maxText
      ? text.substring(0, maxText - 3) + "..."
      : text;
      
}

export const inputLengthThailand = (e) => {
  return e.target.value.replace(/[^ก-๛']/g, '')
    
}

export const inputLengthEnglish = (value) => {
  return value.replace(/[^a-zA-Z0-9']/g, '')
    
}

export const inputEnglishUppercase = (value) => {
  return value.replace(/[^A-Z0-9']/g, '') 
}

export const inputNumber = (value) => {
  return value.replace(/[^0-9']/g, '') 
}
