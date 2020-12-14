const convert = (seconds) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    return {d, h, m, s}
}

export default convert


                    // const d = newDate.toLocaleString().split(reg)
                    // const today = `${d[2]}-${d[0]}-${d[1]<10? '0'+d[1]:d[1]}T${d[3]<10? '0'+d[3]:d[3]}:${d[4]<10? '0'+d[4]:d[4]}`
                
                    // to the date that was set format
                    // const arr = value.split(reg)                    
                    
                    // const days = moment(value).diff(moment(today), 'days').toString()