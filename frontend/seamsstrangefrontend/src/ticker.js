class Ticker{

    static instance;

    constructor(){
        if (Ticker.instance === undefined){
            Ticker.instance = this;
            this.observers = [];
            this.counter = 0;
            this.#iterate();
        }else{
            return Ticker.instance;
        }
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
        this.observers = this.observers.filter(o => o !== observer);
    }

    #iterate(){
        setInterval(() => {
            this.counter = ++this.counter;
            this.#update(this.counter);
        },3000);
    }

    #update(index){
        this.observers.forEach(observer => observer(index));
    }
}
const tickerSingleton = new Ticker();
export default tickerSingleton;