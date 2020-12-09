//autobind decolator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get(){
      const boundFn = originalMethod.bind(this);
      return boundFn
    }
  }
  return adjDescriptor;
}


//ProjectInput Class
class ProjectInput{
  templateElement: HTMLTemplateElement;
  hostElement: HTMLElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor(){
    this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const impotedNode = document.importNode(this.templateElement.content, true);
    this.element = impotedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector("#manday") as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string,string,number] | void{
    const enteredTitle = this.titleInputElement.value;
    const enteredDesction = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;
    if(
      enteredTitle.trim().length === 0 ||
      enteredDesction.trim().length === 0 ||
      enteredManday.trim().length === 0
    ){
      alert("入力値が正しくありません。再度お試しください");
      return;
    }else{
      return [enteredTitle, enteredDesction, +enteredManday];
    }

  }

  private clearInputs(){
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";

  }

  @autobind
  private submitHandler(event: Event){
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if(Array.isArray(userInput)){
      const [title, desc, manday] = userInput;
      console.log(title, desc, manday);
      this.clearInputs()
    }
  }

  private configure(){
    this.element.addEventListener("submit", this.submitHandler)
  }

  private attach(){
    this.hostElement.insertAdjacentElement("afterbegin", this.element)
  }
}

const prjInput = new ProjectInput();