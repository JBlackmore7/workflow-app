const starterData = {
  createOrder: [
    {
      contactName: "test",
      companyName: "testt",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "N/A",
      details: "test",
      workorderType: "service",
      employeeName: "Gord Reid",
      date: "2022-06-06",
      id: 18,
    },
    {
      contactName: "test",
      companyName: "testt",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "N/A",
      details: "test",
      workorderType: "service",
      employeeName: "Gord Reid",
      date: "2022-06-06",
      id: 19,
    },
    {
      contactName: "Sam",
      companyName: "JJB Enterprises",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "N/A",
      details: "test",
      workorderType: "service",
      employeeName: "Gord Reid",
      date: "2022-06-06",
      id: 20,
    },
    {
      contactName: "John Doe",
      companyName: "Exxon Mobil",
      contactNumber: "5555555555",
      companyAddress: "555 Fake Street",
      contactEmail: "john.doe@exxonmobil.com",
      workSite: "Hibernia",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin mi a lacus cursus, at fringilla augue eleifend. Nam turpis turpis, molestie congue mattis non, egestas quis enim. Praesent et erat egestas, euismod orci faucibus, ornare justo. Cras arcu leo, consequat in vulputate laoreet, viverra sed sem. Cras vel dolor et purus elementum maximus. Suspendisse potenti. Sed cursus, ipsum in tincidunt rutrum, nunc lectus ultricies tortor, et rhoncus orci elit vel mi.",
      workorderType: "service",
      employeeName: "Jared Blackmore",
      date: "2022-06-09",
      id: 21,
    },
    {
      contactName: "Jared Blackmore",
      companyName: "yeah!",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "N/A",
      details: "test",
      workorderType: "warehouseTransfer",
      employeeName: "Dr. Jan Itor",
      date: "2022-06-09",
      id: 22,
    },
  ],
  completeOrder: [
    {
      contactName: "Jared Blackmore",
      companyName: "JJB Enterprises",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "na",
      details: "asdgasdgsadg",
      workorderType: "warehouseTransfer",
      employeeName: "Jared Blackmore",
      date: "2022-05-15",
      id: 15,
      jobNumber: "84576",
      service: {
        serviceDetails: "test",
        truckStock: "Shop",
        condemnationDetails: "test",
        parts: [
          {
            quantity: "11",
            partNumber: "test",
            partDescription: "test",
          },
          {
            quantity: "22",
            partNumber: "dfgdf",
            partDescription: "sdfsdfs",
          },
          {
            quantity: "33",
            partNumber: "test part number",
            partDescription: "test part description",
          },
        ],
      },
    },
    {
      contactName: "Keri Blackmore",
      companyName: "Verafin",
      contactNumber: "1234567",
      companyAddress: "123 Verafin Way",
      contactEmail: "keri.blackmore@verafin.com",
      workSite: "The Verafin Express",
      details: "Computers",
      workorderType: "newInstall",
      employeeName: "Keri Blackmore",
      date: "2022-05-31",
      id: 17,
      jobNumber: "12345",
      service: {
        serviceDetails: "Plug in computers",
        truckStock: "JJN018",
        condemnationDetails: "None",
        parts: [
          {
            quantity: "500",
            partNumber: "2",
            partDescription: "Specific computers",
          },
        ],
      },
    },
    {
      contactName: "Jared Blackmore",
      companyName: "JJB Enterprises",
      contactNumber: "7096998777",
      companyAddress: "5 Raleigh Street, St. John's, NL, Canada",
      contactEmail: "jblackmore17@gmail.com",
      workSite: "na",
      details: "test",
      workorderType: "newInstall",
      employeeName: "Gord Reid",
      date: "2022-03-21",
      submit: "Create",
      id: 4,
      jobNumber: "45554",
      service: {
        serviceDetails: "test",
        truckStock: "Shop",
        condemnationDetails: "test",
        parts: [
          {
            quantity: "4",
            partNumber: "test",
            partDescription: "test",
          },
        ],
      },
    },
  ],
};
class WorkorderData {
  constructor() {
    this.data = {};
    this.init();
  }

  init() {
    const storageExists = localStorage.getItem("workorder_data");
    if (!storageExists) {
      localStorage.setItem("workorder_data", JSON.stringify(starterData));
      this.data = starterData;
    } else {
      this.data = JSON.parse(storageExists);
    }
  }

  save() {
    localStorage.setItem("workorder_data", JSON.stringify(this.data));
  }

  nextIndex(collection) {
    let lastIndex = 0;
    collection.forEach((element) => {
      lastIndex = element.id > lastIndex ? element.id : lastIndex;
    });

    return ++lastIndex;
  }

  /*deleteOrder(oldOrder) {
    localStorage.removeItem(oldOrder);
  }*/

  createOrder(orderData) {
    orderData.id = this.nextIndex(this.data.createOrder);
    this.data.createOrder.push(orderData);
    this.save();
  }

  completeOrder(finishedOrder) {
    this.data.completeOrder.push(finishedOrder);
    let workorder_id = finishedOrder.id;
    //let index = this.data.createOrder.indexOf(workorder_id);
    let index = this.data.createOrder.findIndex((object) => {
      return object.id === workorder_id;
    });
    if (index > -1) {
      this.data.createOrder.splice(index, 1);
    }
    this.save();
  }
}
const workData = new WorkorderData();
