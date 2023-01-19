/* Máscaras ER */
function mascara(o,f){
  v_obj=o
  v_fun=f
  setTimeout("execmascara()",1)
}
function execmascara(){
  v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
  v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
  v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
function id( el ){
  return document.getElementById( el );
}
window.onload = function(){
  id('telefone').onkeyup = function(){
    mascara( this, mtel );
  }
}

function success(){
  swal({
    title: "Parabéns!",
    text: "Seu acesso será liberado para o download do ebook.",
    icon: "success",
  });
}
function fail(){
  swal({
    title: "Opss!",
    text: "Infelizmente ocorreu um erro, tente novamente!",
    icon: "error",
  });
}
function inputRequired(){
  swal({
    title: "Opss!",
    text: "Todos os campos precisam ser preenchidos!",
    icon: "warning",
  });
}

function sendEmail(){
  let name = document.getElementById('name').value
  let telefone = document.getElementById('telefone').value
  let mail = document.getElementById('email').value

  let params = {
    name : name,
    telefone: telefone,
    mail : mail
  }

  if( name == '' || telefone == '' || mail == ''){
    inputRequired()

  }else {
    emailjs.send('service_0p43wpq', 'template_jpsrf69', params)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       success()

       const download = 'Deus.pdf'
    
       let card = document.querySelector('.card')
       card.style.display = 'none' 
       let item = document.querySelector('.col-md-4')
       let cardCreate = document.createElement('div')
       item.appendChild(cardCreate)
   
       cardCreate.classList.add('card')
       cardCreate.classList.add('px-4')
       cardCreate.innerHTML = `<h3 class="mt-3">Ebook Liberdado</h3><a href="${download}"><button class="btn btn-success w-100 mb-4 text-uppercase">Baixar</button></a>`
       

    }, function(error) {
       console.log('FAILED...', error);
       fail()
    }) 
  }

}