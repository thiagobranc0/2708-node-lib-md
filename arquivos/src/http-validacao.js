import chalk from "chalk";

function verificaLink(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

function manejaErro(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "link não encontrado";
  } else {
    return "ocorreu algum erro";
  }
}

async function checaStatus(listaURL) {
  const arrStatus = await Promise.all(
    listaURL.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (erro) {
        return manejaErro(erro);
      }
    })
  );
  return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
  const links = verificaLink(listaDeLinks);
  const status = await checaStatus(links);
  return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
  }));
}

// [Teste de retorno 400](https://httpstat.us/404).
// [gatinho salsicha](http://gatinhosalsicha.com.br/)
