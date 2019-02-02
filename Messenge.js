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