import api from './api'

class app {
  constructor(){
    this.repository = []

    this.formEl = document.getElementById("repo-form")
    this.inputEl = document.querySelector("input[name=repository]")
    this.listEl = document.getElementById("repo-list")

    this.registerRepository()
  }

  registerRepository(){
    this.formEl.onsubmit = event => this.addRepository(event)
  }

  setLoading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span')
      loadingEl.appendChild(document.createTextNode('Procurando...'))
      loadingEl.setAttribute('id', 'loading')
      
      this.formEl.appendChild(loadingEl)
    }else{
      document.getElementById('loading').remove()
    }
  }
  
  async addRepository(event){
    event.preventDefault()

    const repoInput = this.inputEl.value

    if (repoInput.lenght === 0) return

    this.setLoading()

    try {
    const response = await api.get(`/repos/${repoInput}`)

    const { name, description, html_url, owner: {avatar_url}} = response.data

    this.repository.push({
      name,
      description,
      avatar_url,
      html_url,
    })

    this.inputEl.value = ''

    this.render()
  }catch(err) {
    alert('O repositório não existe. Tente novamente')
  }
  this.setLoading(false)

  }
  render(){
    this.listEl.innerHTML = ''

    this.repository.forEach(repo => {
      let imgEl = document.createElement('img')
      imgEl.setAttribute('src', repo.avatar_url)

      let titleEl = document.createElement('strong')
      titleEl.appendChild(document.createTextNode(repo.name))

      let descriptionEl = document.createElement('p')
      descriptionEl.appendChild(document.createTextNode(repo.description))

      let linkEl = document.createElement('a')
      linkEl.setAttribute('target', '_blank')
      linkEl.setAttribute('href', repo.html_url)
      linkEl.appendChild(document.createTextNode('Acessar Repositório'))

      let listElelment = document.createElement('li')
      listElelment.appendChild(imgEl)
      listElelment.appendChild(titleEl)
      listElelment.appendChild(descriptionEl)
      listElelment.appendChild(linkEl)

      this.listEl.appendChild(listElelment)
    })
  }
}

new app()
