const starterData = {
  createOrder: [
    {
      contactName: "Luke Skywalker",
      companyName: "Jedi Order",
      contactNumber: "2033263827",
      companyAddress: "Jedi Temple, Senate District, Coruscant",
      contactEmail: "RedFive@rebelalliance.com",
      workSite: "Fighter Hangar",
      details: "Broken S-coils on four T-65B X-wing starfighters need repair",
      workorderType: "Service",
      employeeName: "Jackar Bowmani",
      date: "2022-06-06",
      id: 1,
    },
    {
      contactName: "Leia Organa",
      companyName: "Alliance High Command",
      contactNumber: "2035458123",
      companyAddress: "Great Temple, Yavin 4 (shhh!)",
      contactEmail: "princess@rebelalliance.com",
      workSite: "Rebel Base",
      details: "Client wants to order a dozen new MG-100 StarFortress SF-17 bombers.  Contact with quote.",
      workorderType: "Supply",
      employeeName: "Jackar Bowmani",
      date: "2022-06-08",
      id: 2,
    },
    {
      contactName: "Han Solo",
      companyName: "Jabba's Criminal Empire",
      contactNumber: "1-800-CALL-HAN",
      companyAddress: "Cockpit, Millennium Falcon, Universe",
      contactEmail: "IShotFirst@solo.com",
      workSite: "Millennium Falcon",
      details:
        "Client needs a stock SSP05 hyperdrive sourced immediately.  Client denied installation and said, 'Just get me the damn hyperdrive -- Chewie and I will modify it ourselves.'",
      workorderType: "Supply",
      employeeName: "Jackar Bowmani",
      date: "2022-06-09",
      id: 4,
      jobNumber: "93572",
    },
    {
      contactName: "Darth Vader",
      companyName: "Galactic Empire",
      contactNumber: "9722531090",
      companyAddress: "Bacta Tank, Executive Office, The Executor, Universe",
      contactEmail: "LukesFather@empire.gov",
      workSite: "N/A",
      details: `I was honestly terrified taking the order... he just kept yelling "BRING ME CAN O' BEE" and then disconnected. I guess we'll send someone to Naboo with a can to collect some bees.`,
      workorderType: "Supply",
      employeeName: "Jackar Bowmani",
      date: "2022-06-09",
      id: 5,
      jobNumber: "67421",
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
      contactName: "Darth Sidious",
      companyName: "Galatic Empire",
      contactNumber: "6666660666",
      companyAddress: "Top Floor, Death Star, Universe",
      contactEmail: "PapaSheev@empire.gov",
      workSite: "Garbage Compactor 3263827",
      details: "Dianoga extraction from compactor",
      workorderType: "Inpsection",
      employeeName: "Jackar Bowmani",
      date: "2022-05-15",
      id: 3,
      jobNumber: "84576",
      service: {
        serviceDetails:
          "Arrived on site and determined the scope of the job.  The dianoga had grown to 10 meters in length.  Lured the dianoga from its home with bait, stunned it, and placed it in a mobile holding cell.",
        truckStock: "CDA514",
        condemnationDetails: "none",
        parts: [
          {
            quantity: "4",
            partNumber: "1011678",
            partDescription: "Stun Charges",
          },
          {
            quantity: "1",
            partNumber: "1055082",
            partDescription: "Mobile Holding Cell",
          },
          {
            quantity: "16",
            partNumber: "Labour",
            partDescription: "12 hour shift plus 4 hours of travel",
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
