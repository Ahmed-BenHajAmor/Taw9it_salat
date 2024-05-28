export const getDate = ()=>{
    const now = new Date()
    let res = {}
    res.year = now.getFullYear()
    res.month = now.getMonth()+1
    return res
}