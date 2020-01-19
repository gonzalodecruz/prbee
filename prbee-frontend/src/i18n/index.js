import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const numberFormats = {
    en: {
        currency: {
            style: 'currency', currency: 'USD'
        }
    },
    ja: {
        currency: {
            style: 'currency', currency: 'JPY'
        }
    }
}

const i18n = new VueI18n({
    numberFormats,
    silentTranslationWarn: true,
})

function setI18nLanguage(locale) {
    i18n.locale = locale
    document.querySelector('html').setAttribute('lang', locale)
    return locale
}

export default i18n

export async function loadLanguageAsync(locale) {
    const messages = await import(`@/i18n/messages/${locale}.json`)
    i18n.setLocaleMessage(locale, messages)
    return setI18nLanguage(locale)
}
