var isMomHappy = true;

var willIGetAPhone = new Promise(function(resolve,reject){
    if(isMomHappy) {
        let phone = {
            maker: 'iPhone',
            model: 'XS',
            color: 'black'
        };
        resolve(phone);
    } else {
        let reason = new Error('Mom is not happy');
        reject(reason); 
    }
});

var askMom = function(){
    console.log('before asking mom');
    willIGetAPhone
    .then(showFriend)
    .then(function(phone){
        console.log(phone);
    })
    .catch(function(error){
        console.log(error);
    });
    console.log('after asking mom');
}

var showFriend = function(phone){
    return new Promise(function(resolve,reject){
        if(phone){
            resolve(`Look at my new ${phone.color} ${phone.maker} ${phone.model}`);
        } else {
            reject(new Error('Phone not available!'));
        }
    });
}

askMom();