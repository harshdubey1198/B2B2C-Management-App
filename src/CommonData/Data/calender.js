const events = [
  {
    id: 1,
    title: "Birthday Party",
    start: new Date().setDate(new Date().getDate() + 1),
    className: "bg-success text-white",
  },
  {
    id: 2,
    title: "Meeting",
    start: new Date(),
    end: new Date(),
    className: "bg-success text-white",
  },
  {
    id: 3,
    title: "Meet John Deo",
    start: new Date().setDate(new Date().getDate() + 8),
    className: "bg-info text-white",
  },
  {
    id: 4,
    title: "Buy a Theme",
    start: new Date().setDate(new Date().getDate() + 7),
    className: "bg-primary text-white",
  },
  {
    id: 5,
    title: "All Day Event",
    start: new Date().setDate(new Date().getDate() - 27),
    className: "bg-primary text-white",
  },
  {
    id: 6,
    title: "Repeating Event",
    start: new Date().setDate(new Date().getDate() + 4),
    className: "bg-primary text-white",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(),
    end: new Date(),
    className: "bg-danger text-white",
  },
  {
    id: 8,
    title: "Repeating Event",
    start: new Date().setDate(new Date().getDate() - 3),
    className: "bg-info text-white",
  },
  {
    id: 9,
    title: "Long Event",
    start: new Date().setDate(new Date().getDate() - 5),
    end: new Date().setDate(new Date().getDate() - 2),
    className: "bg-warning text-white",
  },
]

const calenderDefaultCategories = [
  {
    id: 1,
    title: "New Event Planning",
    type: "bg-success",
  },
  {
    id: 2,
    title: "Meeting",
    type: "bg-info",
  },
  {
    id: 3,
    title: "Generating Reports",
    type: "bg-warning",
  },
  {
    id: 4,
    title: "Create New theme",
    type: "bg-danger",
  },
]

export { calenderDefaultCategories, events }
