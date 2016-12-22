export default class Format {
  formatMailLink(mail){
    return 'mailto:' + mail
  }
  
  formatPhoneLink(phone){
    return 'tel:' + phone
  }
}