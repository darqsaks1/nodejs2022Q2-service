

export class FullyData {
  private dataBase = [];
  private entity: new (data) => any;

  constructor(entity: { new(data): any }) {
    this.entity = entity;
  }

  async create(data) {
    return new Promise((resolver) => {
      const newData = new this.entity(data);
      this.dataBase.push(newData);

      resolver(newData);
    });
  }

  async findAll() {
    return new Promise((resolver) => {
      resolver(this.dataBase.map((data) => data));
    });
  }

  async findOne(id: string) {
    return new Promise(async (resolver) => {
      const foundData = this.dataBase.find((data) => data.id === id);

      if (!foundData) resolver(undefined);

      resolver(foundData);
    });
  }

  async update(id: string, rawData) {
    return new Promise(async (resolver) => {
      const newData = new this.entity(rawData);
      this.dataBase = this.dataBase.map((data) => (data.id === id ? newData : data));

      resolver(newData);
    });
  }

  async remove(id: string) {
    return new Promise(async (resolver) => {
      this.dataBase = this.dataBase.filter((data) => data.id !== id);
      resolver(true);
    });
  }
}
