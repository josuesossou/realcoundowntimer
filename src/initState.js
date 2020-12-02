const dateString = Date.now()
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
const date = new Date(dateString).toLocaleString('en-US', dateOptions)

export default {
    showDay: true,
    showHour: true,
    showDate: true,
    days: 0, 
    hours: 0, 
    minutes: 5, 
    seconds: 15,
    date,
    title: 'New Countdown',
    backgroundType: 'solid', //gradien, url, later upload, and uploadVideo 
    counterBgType: 'none', //group digit each group, all
    colorToUpdate: 'bgColor',
    bgColor: '#888888',
    bgType: 'solid',
    gradientFirstColor: '#D87373',
    gradientSecondColor: '#888888',
    gradientAngle: 180,
    urlBg: '',
    urlBgSize: 'cover',
    counterBgColor: '#888888',
    counterBgHeirearchy: 0,
    textColor: '#000',
    fontFamily: 'Droid Sans',
    cache: true
}