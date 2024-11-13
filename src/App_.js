import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          SelectFriend={SelectFriend}
          selected={selected}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button click={handleToggle}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selected && (
        <FormSplitBill onSplitBill={onSplitBill} selected={selected} />
      )}
    </div>
  );

  function handleToggle() {
    setshowAddFriend(!showAddFriend);
  }
  function SelectFriend(friend) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
  }
  function handleAddFriend(newFriend) {
    setFriendsList((friend) => [...friend, newFriend]);
    setshowAddFriend(false);
  }

  function onSplitBill(e) {
    e.preventDefault();

    // const editedFriend = friendsList.filter((friend) =>
    //   friend.id === Number(selected) ? (friend.balance = 5) : friend
    // );

    setFriendsList((split) => split);

    setSelected(false);
  }
}

/////////////////////////////////////////////////////
function Button({ click, children, id = "" }) {
  return (
    <button id={id} className="button" onClick={click}>
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/");

  function handleSubmit(e) {
    e.preventDefault();

    const id = Date.now();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">Friend's name:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Friend's Name"
      />
      <label htmlFor="image">Friend's image:</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
        placeholder="Friend's Image URL"
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("0");
  const [who, setWho] = useState("you");
  const calcExpense = bill ? bill - yourExpense : "";

  if (selected === false) {
    return <p>Select a friend to split the bill</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !yourExpense)
      onSplitBill(who === "you" ? calcExpense : -yourExpense);

    setBill(0);
    setYourExpense(0);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <label htmlFor="billvalue">Bill Value</label>
      <input
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        type="text"
        name="billvalue"
        id=""
      />
      <label htmlFor="yourexpense">Your Expense</label>
      <input
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
        type="text"
        name="yourexpense"
        id=""
      />
      <label htmlFor="friendexpense">{calcExpense}'s Expense</label>
      <input
        value={calcExpense}
        type="text"
        disabled
        name="friendexpense"
        id=""
      />
      <label htmlFor="who">Who is paying the bill</label>
      <select
        name="who"
        onChange={(e) => setWho(e.target.value)}
        value={who}
        id=""
      >
        <option value="you">You</option>
        <option value="friend">{selected.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function FriendsList({ friendsList, SelectFriend, selected }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          key={friend.id}
          SelectFriend={SelectFriend}
          friend={friend}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, key, SelectFriend, selected }) {
  const isSelected = selected?.id === selected.id;

  return (
    <li key={key} className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="Profile" />
      <h3>{friend.name}</h3>
      <p
        className={`${
          friend.balance === 0 ? "" : friend.balance < 0 ? "red" : "green"
        }`}
      >
        {friend.balance === 0 && `You and ${friend.name} are even`}
        {friend.balance > 0 && `${friend.name} owes you $${friend.balance}`}
        {friend.balance < 0 && `You owe ${friend.name} $${friend.balance * -1}`}
      </p>
      <Button click={(e) => SelectFriend(friend)}>Select</Button>
    </li>
  );
}
