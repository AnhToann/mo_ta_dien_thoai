function Data(namePhone) {
    this.draftBoxArchives = [];
    this.sentBoxArchives = [];
    this.inBoxArchives = [];

    this.addData = (archives, newMess) => {
        archives.push(newMess);
    };
    this.getData = (archives) => {
        return archives;
    }
    this.showData = (archives, nameBox) => {
        const selector = document.querySelector(`tr#${namePhone}${nameBox} td.boxMess ul`);
        let list='';
        for (let i = archives.length - 1; i >=0 ; i--) {
            list += `<li class="itemMess"><p class="title">${archives[i].title}</p><p class="date">${archives[i].dateCreate}</p><p class="author">${archives[i].author}</p><p class="number">${archives[i].number}</p><hr><p>${archives[i].content}</p></li>`;
        }
        selector.innerHTML = list;
    }
    function getDate() {
        let now = new Date();
        return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    }
