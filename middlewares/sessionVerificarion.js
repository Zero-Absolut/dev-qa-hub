



export function requireLogin(req, res, next){ 

    if(req.session && req.session.userId){
        return next(); 
    }else{
        
        return res.redirect('/login'); 
    }
}

export function logout(req, res){
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
        }
        
        
        res.redirect('/index'); 
    });
}

