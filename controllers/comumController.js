const getBemVindo = (request, response) => {
    response.status(200).send('API da e-Lib <br/> <a href="https://elib-front.vercel.app/">Clique para acessar a interface de usuário</a>');
}

module.exports = {
    getBemVindo
}

