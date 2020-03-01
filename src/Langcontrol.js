
class Lang {

    static setLang(lang) {
        localStorage.setItem('lang_rohan', lang)
        
    }



    static getLang() {
        return localStorage.getItem('lang_rohan')
    }
}

export default Lang