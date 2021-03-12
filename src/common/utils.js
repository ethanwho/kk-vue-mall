export function debounce(func, delay) {
    let timer = null    //timer有闭包
    return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}