# Imagens

Convenção de nomes. Depois de colocar o arquivo aqui, aponte o caminho no
campo correspondente em `src/data/` — a imagem só é renderizada quando o
campo está preenchido, então nunca aparece placeholder vazio no site.

- `talks/<id-da-palestra>.jpg` — foto de palco/stand, campo `photo` em `src/data/talks.js`
- `photos/<id>.jpg` — retratos e momentos, lista em `src/data/photos.js` (aparecem no álbum Fotos do app Arquivos)
- `photos/avatar.jpg` — rosto recortado em quadrado, usado no contato e na janela "Sobre mim"
- `projects/<id-do-projeto>.jpg` — screenshot, campo `image` em `src/data/projects.js`

Formato: JPG, 1200px no lado maior, sem metadados (EXIF/GPS). Para preparar:

    magick original.jpg -auto-orient -strip -resize '1200x1200>' -interlace JPEG -quality 82 destino.jpg

Proteção: o `robots.txt` (gerado em `vite.config.js`) tira `/images/` do
Google Imagens, e as fotos usam `photoGuard` (`src/lib/photoGuard.js`) para
não serem arrastadas nem salvas pelo clique direito. É dissuasão, não DRM:
print continua funcionando.
