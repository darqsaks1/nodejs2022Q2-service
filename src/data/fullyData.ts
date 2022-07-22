export class FullyData {
  public dataBase = [];
  public data: new (data) => any;
  constructor(newData: { new(data): any }) {
    this.data = newData;
  }
  async findOneItem(id: string) {
    return new Promise(async (resolver) => {
      resolver(this.dataBase.find((data) => data.id === id));
    });
  } async findAllItems() {
    return new Promise((resolver) => {
      resolver(this.dataBase.map((data) => data));
    });
  }
  async createNewItem(x: any) {
    return new Promise((resolver) => {
      this.dataBase.push(new this.data(x));
      resolver(new this.data(x));
    });
  }
  async updateItems(id: string, dataSelected: any) {
    return new Promise(async (resolver) => {
      this.dataBase = this.dataBase.map((data) => (data.id === id ? new this.data(dataSelected) : data));
      resolver(new this.data(dataSelected));
    });
  }
  async removeItems(id: string) {
    return new Promise(async (resolver) => {
      this.dataBase = this.dataBase.filter((data) => data.id !== id);
      resolver(true);
    });
  }
}
