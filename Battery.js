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