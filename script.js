function Battery(namePhone, namePhoneObj) {
    const mucDoChaiPin = 0; // 0 là mức chai cao nhất (tức là pin có thể vứt đi được rồi) - ngược lại càng cao thì càng tốt
    this.batteryLevel = 10;
    this.usingLevel = mucDoChaiPin;

    this.showBattery = () => {
        const displayBattery = document.getElementById(`${namePhone}DisplayBattery`);
        displayBattery.innerText = this.batteryLevel;
    }
    this.chargeBattery = () => {
        this.batteryLevel = 100;
        this.showBattery();
    }
    this.checkBattery = () => {
        this.usingLevel++;
        if (this.usingLevel >= 1) {
            this.batteryLevel--;
            this.usingLevel = mucDoChaiPin;
        }
        if (this.batteryLevel == 0) {
            namePhoneObj.isTurnOn = false;
            const rowCreateMessengeSelector = document.querySelectorAll(`div#${namePhone} table tr.createMessenge`).forEach(item => {
                item.style.display = 'none';
            });
            const rowMessBoxSelector = document.querySelectorAll(`div#${namePhone} table tr.messBox`).forEach(item => {
                item.style.display = 'none';
            });
        }
        this.showBattery();
        namePhoneObj.showTurnOnStatus();
    }
}

46  js/Messenge.js
@@ -0,0 +1,46 @@
function Messenge(namePhoneObj, namePhone, phoneNumber, listPhoneObj) {
    this.isHadNewMess = false;

    this.getTitleMessInputValue = () => {
        const createTitleMessInput = document.getElementById(`${namePhone}CreateTitleMessInput`);
        return createTitleMessInput.value;
    }

    this.getContentMessInputValue = () => {
        const createContentMessInput = document.getElementById(`${namePhone}CreateContentMessInput`);
        return createContentMessInput.value;
    }

    this.isNullFieldInput = () => {
        return (this.getTitleMessInputValue()=='') || (this.getContentMessInputValue()=='')
    }

    this.createMess = () => {
        const title = this.getTitleMessInputValue();
        const date = getDate();
        const content = this.getContentMessInputValue();
        let text = new TextMessenge(title, date, content, namePhone, phoneNumber);
        return text;
    }

    this.deleteFieldInput = () => {
        const createTitleMessInput = document.getElementById(`${namePhone}CreateTitleMessInput`).value='';
        const createContentMessInput = document.getElementById(`${namePhone}CreateContentMessInput`).value='';
    }

    this.saveMess = () => {
        namePhoneObj.data.addData(namePhoneObj.data.draftBoxArchives, this.createMess());
    }
    this.sendMess = () => {
        namePhoneObj.data.addData(namePhoneObj.data.sentBoxArchives, this.createMess());
    }
    this.receiveMess = () => {

    }
    this.showMess = () => {

    }
    this.deleteMess = () => {

    }
}

33  js/Mobile.js
@@ -0,0 +1,33 @@
function Mobile(namePhone, phoneNumber) {
    this.namePhone = namePhone;
    this.phoneNumber = phoneNumber;
    this.isTurnOn = true;
    this.battery = new Battery(namePhone, this);
    this.data = new Data(this.namePhone);

    this.messenge = new Messenge(this, namePhone, phoneNumber);
    this.handlingEvent = new AddEvent(this, namePhone);
    this.power = () => {
        this.isTurnOn = (this.isTurnOn) ? false : true;
        if (this.isTurnOn) {
            const rowCreateMessengeSelector = document.querySelectorAll(`div#${namePhone} table tr.createMessenge`).forEach(item => {
                item.style.display = '';
            });
            const rowMessBoxSelector = document.querySelectorAll(`div#${namePhone} table tr.messBox`).forEach(item => {
                item.style.display = '';
            });
        }
        else {
            const rowCreateMessengeSelector = document.querySelectorAll(`div#${namePhone} table tr.createMessenge`).forEach(item => {
                item.style.display = 'none';
            });
            const rowMessBoxSelector = document.querySelectorAll(`div#${namePhone} table tr.messBox`).forEach(item => {
                item.style.display = 'none';
            });
        }
    }
    this.showTurnOnStatus = () => {
        const turnOnStatus = document.getElementById(`${namePhone}IsTurnOn`);
        turnOnStatus.innerHTML = (this.isTurnOn) ? '<b>ON</b>' : '<b>OFF</b>';
    }
}

8  js/TextMessenge.js
@@ -0,0 +1,8 @@
function TextMessenge(title, date, content, author, number) {
    this.title = title;
    this.dateCreate = date;
    this.content = content;
    this.author = author;
    this.number = number;
    return this;
}

20  js/data.js
@@ -0,0 +1,20 @@
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
}

5  js/getSomething.js
@@ -0,0 +1,5 @@
function getDate() {
    let now = new Date();
    return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
}


67  js/handlingEvent.js
@@ -0,0 +1,67 @@
function AddEvent(namePhoneObj, namePhone) {
    this.addEventForSaveMessBtn = () => {
        const createMessBtn = document.querySelectorAll(`div#${namePhone} table tr td input[value="Save"]`).forEach( item => {
            item.addEventListener('click', () => {
                if (namePhoneObj.messenge.isNullFieldInput())
                    alert('Title và Content không được để trống!');
                else {
                    namePhoneObj.messenge.saveMess();
                    namePhoneObj.data.showData(namePhoneObj.data.draftBoxArchives,'DraftBox');
                    namePhoneObj.messenge.deleteFieldInput();
                    namePhoneObj.battery.checkBattery();
                }
            });
        });
    }

    this.addEventForSendMessBtn = () => {
        const createMessBtn = document.querySelectorAll(`div#${namePhone} table tr td input[value="Send"]`).forEach( item => {
            item.addEventListener('click', () => {

                if (namePhoneObj.messenge.isNullFieldInput())
                    alert('Title và Content không được để trống!');
                else {
                    namePhoneObj.messenge.sendMess();
                    namePhoneObj.data.showData(namePhoneObj.data.sentBoxArchives,'SentBox');
                    if (namePhoneObj===listPhoneObj[0]) {
                        listPhoneObj[1].data.addData(listPhoneObj[1].data.inBoxArchives, namePhoneObj.data.sentBoxArchives[namePhoneObj.data.sentBoxArchives.length-1]);
                        listPhoneObj[1].data.showData(listPhoneObj[1].data.inBoxArchives, 'InBox');
                    }
                    else {
                        listPhoneObj[0].data.addData(listPhoneObj[0].data.inBoxArchives, namePhoneObj.data.sentBoxArchives[namePhoneObj.data.sentBoxArchives.length-1]);
                        listPhoneObj[0].data.showData(listPhoneObj[0].data.inBoxArchives, 'InBox');
                    }

                    namePhoneObj.messenge.deleteFieldInput();
                    namePhoneObj.battery.checkBattery();
                }
            });
        });
    }

    this.pushPowerBtn = () => {
        let powerBtn = document.getElementById(`${namePhone}PowerBtn`);
        powerBtn.addEventListener('click', () => {
            if (namePhoneObj.battery.batteryLevel===0)
                alert('Điện thoại hết pin! Yêu cầu sạc điện thoại trước!');
            else {
                namePhoneObj.power();
                namePhoneObj.showTurnOnStatus();
            }
        });
    }

    this.pushChargeBtn = () => {
        let powerBtn = document.getElementById(`${namePhone}ChargeBtn`);
        powerBtn.addEventListener('click', () => {
            namePhoneObj.battery.chargeBattery();
        });
    }

    this.addEventAllBtn = () => {
        this.pushPowerBtn();
        this.pushChargeBtn();
        this.addEventForSendMessBtn();
        this.addEventForSaveMessBtn();
    }
}

23  js/script.js
@@ -0,0 +1,23 @@
function getDate() {
    let now = new Date();
    return `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
}

function TextMessenge(title, date, content, author, number) {
    this.title = title;
    this.dateCreate = date;
    this.content = content;
    this.author = author;
    this.number = number;
    return this;
}

let nokia = new Mobile('nokia');
nokia.battery.showBattery();
nokia.showTurnOnStatus();
nokia.pushPowerBtn();

let iPhone = new Mobile('iPhone');
iPhone.battery.showBattery();
iPhone.showTurnOnStatus();
iPhone.pushPowerBtn();

14  script.js
@@ -0,0 +1,14 @@
    let nokia = new Mobile('nokia','0886948987');
let iPhone = new Mobile('iPhone','113');
let listPhoneObj = [nokia, iPhone];

window.onload = () => {
    nokia.battery.showBattery();
    nokia.showTurnOnStatus();

    iPhone.battery.showBattery();
    iPhone.showTurnOnStatus();

    nokia.handlingEvent.addEventAllBtn();
    iPhone.handlingEvent.addEventAllBtn();
}