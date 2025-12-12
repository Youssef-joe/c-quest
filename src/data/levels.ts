import { Level } from '@/types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "The Leaky Vault",
    subtitle: "Encapsulation & Abstraction",
    description: "Master the art of hiding your data from mischievous goblins!",
    story: `🧙‍♂️ Welcome, young Code Wizard! The kingdom's treasury has been ROBBED! 
    
The foolish apprentice left the BankAccount's gold publicly exposed. Goblins waltzed in and changed the balance to ZERO!

Your quest: SEAL the vault with proper encapsulation. Make fields private and add safe access through properties!`,
    hint: "Use 'private' for fields, create properties with 'get' and 'set'. Consider using 'private set' to prevent external modification!",
    starterCode: `// 🚨 DANGER! This vault is WIDE OPEN!
// Goblins can directly modify the balance!
public class BankAccount
{
    // TODO: Make these fields PRIVATE!
    public decimal balance;
    public string ownerName;
    
    // TODO: Add PROPERTIES to safely access data
    // Hint: public decimal Balance { get; private set; }
    
    public BankAccount(string owner, decimal initial)
    {
        ownerName = owner;
        balance = initial;
    }
    
    // TODO: Add a Deposit method
    // TODO: Add a Withdraw method with validation
}`,
    solution: `public class BankAccount
{
    private decimal _balance;
    private string _ownerName;
    
    public decimal Balance { get { return _balance; } }
    public string OwnerName { get { return _ownerName; } }
    
    public BankAccount(string owner, decimal initial)
    {
        _ownerName = owner;
        _balance = initial;
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0) _balance += amount;
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= _balance)
        {
            _balance -= amount;
            return true;
        }
        return false;
    }
}`,
    validationRules: [
      { type: 'contains', value: 'private', message: '🔒 You need private fields!' },
      { type: 'notContains', value: 'public decimal balance', message: '⚠️ The balance field is still public! Goblins can steal it!' },
      { type: 'notContains', value: 'public string ownerName', message: '⚠️ The ownerName is exposed! Make it private!' },
      { type: 'containsAny', value: ['get;', 'get {', 'get{'], message: '📖 Add a getter to read the balance safely!' },
      { type: 'containsAny', value: ['Deposit', 'AddFunds', 'Credit'], message: '💰 Add a method to deposit money!' },
      { type: 'containsAny', value: ['Withdraw', 'RemoveFunds', 'Debit'], message: '💸 Add a method to withdraw money!' },
    ],
    xpReward: 100,
    successMessage: "🎉 BRILLIANT! The vault is SEALED! Goblins are crying outside, unable to touch your gold! +100 XP",
    failureMessage: "😈 Hehe! The goblin sneaks in... Your gold is GONE!",
    visualType: 'treasure',
  },
  {
    id: 2,
    title: "Spaghetti Apocalypse",
    subtitle: "Why OOP Matters",
    description: "Transform chaotic procedural code into clean, organized classes!",
    story: `🍝 DISASTER! The ancient codebase has become a SPAGHETTI MONSTER!
    
Variables everywhere, no structure, functions scattered like fallen leaves. The monster grows stronger with every tangled line!

Your quest: DEFEAT the monster by organizing code into proper classes with single responsibilities!`,
    hint: "Create separate classes for different concepts. A Player class, an Inventory class, etc. Each class should have ONE job!",
    starterCode: `// 🍝 THE SPAGHETTI MONSTER CODE 🍝
// This is how NOT to write code!

string playerName = "Hero";
int playerHealth = 100;
int playerGold = 50;
string[] inventory = new string[10];
int inventoryCount = 0;

void DamagePlayer(int damage)
{
    playerHealth -= damage;
    if (playerHealth < 0) playerHealth = 0;
}

void AddItem(string item)
{
    if (inventoryCount < 10)
    {
        inventory[inventoryCount] = item;
        inventoryCount++;
    }
}

// TODO: Transform this into CLEAN OOP!
// Create a Player class with properties
// Create an Inventory class
// Use encapsulation!

public class Player
{
    // Your code here...
}`,
    solution: `public class Player
{
    public string Name { get; private set; }
    public int Health { get; private set; }
    public int Gold { get; private set; }
    public Inventory Backpack { get; }
    
    public Player(string name)
    {
        Name = name;
        Health = 100;
        Gold = 50;
        Backpack = new Inventory(10);
    }
    
    public void TakeDamage(int damage)
    {
        Health = Math.Max(0, Health - damage);
    }
}

public class Inventory
{
    private List<string> _items;
    public int Capacity { get; }
    
    public Inventory(int capacity)
    {
        Capacity = capacity;
        _items = new List<string>();
    }
    
    public bool AddItem(string item)
    {
        if (_items.Count < Capacity)
        {
            _items.Add(item);
            return true;
        }
        return false;
    }
}`,
    validationRules: [
      { type: 'contains', value: 'class Player', message: '🧙 Create a Player class!' },
      { type: 'containsAny', value: ['class Inventory', 'List<', 'IList<'], message: '🎒 Create an Inventory class or use a List!' },
      { type: 'contains', value: 'private', message: '🔒 Use private fields for encapsulation!' },
      { type: 'containsAny', value: ['get;', 'get {'], message: '📖 Add properties to access data!' },
      { type: 'containsAny', value: ['Health', 'HP', 'HealthPoints'], message: '❤️ Add a Health property!' },
    ],
    xpReward: 150,
    successMessage: "🗡️ The Spaghetti Monster DISSOLVES into clean, readable code! +150 XP",
    failureMessage: "🍝 The Spaghetti Monster grows LARGER! It's feeding on your messy code!",
    visualType: 'spaghetti',
  },
  {
    id: 3,
    title: "The Inheritance Forest",
    subtitle: "Code Reuse & Hierarchies",
    description: "Build proper class hierarchies without the dreaded flying penguin problem!",
    story: `🌲 The enchanted forest is home to many creatures, but the magic is BROKEN!
    
Someone made Penguin extend FlyingBird... now penguins are crashing into trees! The animals need a PROPER hierarchy!

Your quest: Create a safe inheritance structure. Remember: "Favor composition over inheritance" when things get weird!`,
    hint: "Not all birds fly! Consider using interfaces like ICanFly, or restructure the hierarchy. Base classes should only contain shared behavior!",
    starterCode: `// 🐧 THE FLYING PENGUIN PROBLEM 🐧
// This hierarchy is BROKEN!

public class Animal
{
    public string Name { get; set; }
    public virtual void MakeSound() { }
}

// TODO: Fix this hierarchy!
// Not all birds can fly!
public class Bird : Animal
{
    public virtual void Fly()
    {
        Console.WriteLine("Flying high!");
    }
}

public class Penguin : Bird
{
    // 😱 Penguins can't fly but inherit Fly()!
    public override void Fly()
    {
        // This is a code smell!
        throw new NotImplementedException("Penguins can't fly!");
    }
}

// TODO: Create a proper hierarchy
// Consider: interface ICanFly { void Fly(); }
// Only flying birds should implement it!`,
    solution: `public abstract class Animal
{
    public string Name { get; protected set; }
    public abstract void MakeSound();
}

public interface ICanFly
{
    void Fly();
}

public interface ICanSwim
{
    void Swim();
}

public class Bird : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Chirp!");
    }
}

public class Eagle : Bird, ICanFly
{
    public void Fly()
    {
        Console.WriteLine("Soaring through the sky!");
    }
}

public class Penguin : Bird, ICanSwim
{
    public override void MakeSound()
    {
        Console.WriteLine("Squawk!");
    }
    
    public void Swim()
    {
        Console.WriteLine("Swimming gracefully!");
    }
}`,
    validationRules: [
      { type: 'contains', value: 'interface', message: '📜 Create an interface (like ICanFly) for optional abilities!' },
      { type: 'containsAny', value: ['ICanFly', 'IFlyable', 'IFlying'], message: '🦅 Create a flying interface!' },
      { type: 'notContains', value: 'class Penguin : Bird\n    public virtual void Fly', message: '🐧 Penguins should NOT have a Fly method directly!' },
      { type: 'containsAny', value: ['abstract', 'virtual', 'override'], message: '🎭 Use abstract/virtual/override for polymorphism!' },
      { type: 'contains', value: 'class Bird', message: '🐦 Keep the Bird base class!' },
    ],
    xpReward: 175,
    successMessage: "🌲 The forest rejoices! Penguins swim happily while eagles soar! +175 XP",
    failureMessage: "💥 CRASH! Another penguin hits a tree trying to fly!",
    visualType: 'animals',
  },
  {
    id: 4,
    title: "The Shape Shifter",
    subtitle: "Polymorphism in Action",
    description: "Harness the power of many forms with polymorphic magic!",
    story: `✨ The Shape Shifter challenges you to a duel of POLYMORPHISM!
    
"One method, MANY forms!" it cackles. "Can you make shapes that all Draw() differently but through the SAME interface?"

Your quest: Create shapes that respond to the same method call with their unique behaviors!`,
    hint: "Use abstract base class or interface. Each shape implements Draw() its own way. The magic is calling shape.Draw() without knowing the exact type!",
    starterCode: `// ✨ THE POLYMORPHISM CHALLENGE ✨
// One method, many forms!

// TODO: Create an abstract Shape class or IShape interface
// Each shape should have: Draw(), CalculateArea()

public abstract class Shape
{
    public abstract void Draw();
    public abstract double CalculateArea();
}

// TODO: Create Circle, Rectangle, Triangle
// Each with unique Draw() implementation

public class Circle : Shape
{
    public double Radius { get; set; }
    
    // Implement Draw() and CalculateArea()
}

// TODO: Create a method that draws ANY shape:
// void DrawShape(Shape shape) { shape.Draw(); }`,
    solution: `public abstract class Shape
{
    public string Color { get; set; }
    public abstract void Draw();
    public abstract double CalculateArea();
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a {Color} circle with radius {Radius}");
    }
    
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing a {Color} rectangle {Width}x{Height}");
    }
    
    public override double CalculateArea()
    {
        return Width * Height;
    }
}

public static void DrawShape(Shape shape)
{
    shape.Draw(); // Polymorphism in action!
}`,
    validationRules: [
      { type: 'contains', value: 'abstract', message: '✨ Use abstract for the base Shape!' },
      { type: 'contains', value: 'override', message: '🔄 Override methods in derived classes!' },
      { type: 'containsAll', value: ['Circle', 'Rectangle'], message: '⬜ Create both Circle and Rectangle classes!' },
      { type: 'containsAny', value: ['Draw()', 'Draw ('], message: '🎨 Implement the Draw method!' },
      { type: 'containsAny', value: ['CalculateArea', 'GetArea', 'Area()'], message: '📐 Implement area calculation!' },
    ],
    xpReward: 150,
    successMessage: "🎭 The shapes dance and transform! You've mastered polymorphism! +150 XP",
    failureMessage: "😵 The shapes refuse to shift... The code won't compile in their dimension!",
    visualType: 'shapes',
  },
  {
    id: 5,
    title: "The Contract Keeper",
    subtitle: "Interfaces & Abstraction",
    description: "Forge unbreakable contracts that ensure all implementations behave correctly!",
    story: `📜 The Contract Keeper guards the realm of INTERFACES!
    
"Any who wish to process payments MUST sign my contract!" they declare. Credit cards, PayPal, crypto - all must implement IPayable!

Your quest: Create an interface contract and multiple implementations that all honor it!`,
    hint: "Interfaces define WHAT something can do, not HOW. IPayable might have ProcessPayment(decimal amount). Multiple classes can implement it differently!",
    starterCode: `// 📜 THE INTERFACE CONTRACT 📜
// All payment methods must honor this contract!

// TODO: Create the IPayable interface
// It should have: bool ProcessPayment(decimal amount)
// Maybe also: bool Refund(decimal amount)

public interface IPayable
{
    // Define the contract here
}

// TODO: Implement CreditCardPayment
public class CreditCardPayment : IPayable
{
    public string CardNumber { get; set; }
    // Implement the interface
}

// TODO: Implement CryptoPayment
public class CryptoPayment : IPayable
{
    public string WalletAddress { get; set; }
    // Implement the interface
}

// TODO: Create a PaymentProcessor that accepts ANY IPayable
public class PaymentProcessor
{
    public void Process(IPayable payment, decimal amount)
    {
        // Use the interface!
    }
}`,
    solution: `public interface IPayable
{
    bool ProcessPayment(decimal amount);
    bool Refund(decimal amount);
    string PaymentMethod { get; }
}

public class CreditCardPayment : IPayable
{
    public string CardNumber { get; set; }
    public string PaymentMethod => "Credit Card";
    
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine("Charging " + amount + " to card " + CardNumber);
        return true;
    }
    
    public bool Refund(decimal amount)
    {
        Console.WriteLine("Refunding " + amount + " to card");
        return true;
    }
}

public class CryptoPayment : IPayable
{
    public string WalletAddress { get; set; }
    public string PaymentMethod => "Cryptocurrency";
    
    public bool ProcessPayment(decimal amount)
    {
        Console.WriteLine("Sending " + amount + " to wallet " + WalletAddress);
        return true;
    }
    
    public bool Refund(decimal amount)
    {
        Console.WriteLine("Refunding crypto to wallet");
        return true;
    }
}

public class PaymentProcessor
{
    public bool Process(IPayable payment, decimal amount)
    {
        return payment.ProcessPayment(amount);
    }
}`,
    validationRules: [
      { type: 'contains', value: 'interface IPayable', message: '📜 Define the IPayable interface!' },
      { type: 'containsAny', value: ['ProcessPayment', 'Pay(', 'MakePayment'], message: '💳 Add a payment processing method!' },
      { type: 'contains', value: ': IPayable', message: '✅ Implement IPayable in your payment classes!' },
      { type: 'containsAll', value: ['CreditCardPayment', 'CryptoPayment'], message: '💰 Create both payment types!' },
      { type: 'containsAny', value: ['IPayable payment', 'IPayable p'], message: '🔗 Use IPayable as a parameter type for polymorphism!' },
    ],
    xpReward: 175,
    successMessage: "📜 The Contract Keeper nods approvingly! All payments process flawlessly! +175 XP",
    failureMessage: "❌ CONTRACT VIOLATION! The payment failed to honor its interface!",
    visualType: 'payments',
  },
  {
    id: 6,
    title: "The Paradigm Duel",
    subtitle: "FP vs OOP Showdown",
    description: "Solve the same problem with both OOP classes AND functional records + LINQ!",
    story: `⚔️ Two ancient wizards challenge you: The OOP Master and the Functional Sage!
    
"Solve this problem MY way!" they both demand. You must prove mastery of BOTH paradigms!

Your quest: Process a list of orders - once with traditional classes, once with records and LINQ!`,
    hint: "Records are immutable data carriers (record Order(...)). LINQ provides functional transformations (.Where(), .Select(), .Sum()). Classes encapsulate behavior!",
    starterCode: `// ⚔️ THE PARADIGM DUEL ⚔️
// Solve the same problem TWO ways!

// CHALLENGE: Calculate total value of all completed orders

// === OOP APPROACH ===
// TODO: Create Order class with status and amount
// TODO: Create OrderProcessor class with method to sum completed orders

public class Order
{
    // Properties: Id, Amount, IsCompleted
}

public class OrderProcessor
{
    private List<Order> _orders;
    
    public decimal CalculateCompletedTotal()
    {
        // Use traditional OOP
    }
}

// === FUNCTIONAL APPROACH ===
// TODO: Create Order record
// TODO: Use LINQ to filter and sum

public record OrderRecord(int Id, decimal Amount, bool IsCompleted);

// Use LINQ:
// orders.Where(o => o.IsCompleted).Sum(o => o.Amount)`,
    solution: `// === OOP APPROACH ===
public class Order
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public bool IsCompleted { get; set; }
}

public class OrderProcessor
{
    private List<Order> _orders = new();
    
    public void AddOrder(Order order) => _orders.Add(order);
    
    public decimal CalculateCompletedTotal()
    {
        decimal total = 0;
        foreach (var order in _orders)
        {
            if (order.IsCompleted)
                total += order.Amount;
        }
        return total;
    }
}

// === FUNCTIONAL APPROACH ===
public record OrderRecord(int Id, decimal Amount, bool IsCompleted);

public static class OrderFunctions
{
    public static decimal CalculateCompletedTotal(IEnumerable<OrderRecord> orders)
        => orders.Where(o => o.IsCompleted).Sum(o => o.Amount);
    
    public static IEnumerable<OrderRecord> GetCompleted(IEnumerable<OrderRecord> orders)
        => orders.Where(o => o.IsCompleted);
}`,
    validationRules: [
      { type: 'contains', value: 'class Order', message: '📦 Create the Order class!' },
      { type: 'contains', value: 'record', message: '📋 Use a record for the functional approach!' },
      { type: 'containsAny', value: ['.Where(', '.Filter('], message: '🔍 Use LINQ Where for filtering!' },
      { type: 'containsAny', value: ['.Sum(', 'Aggregate('], message: '➕ Use LINQ Sum for totaling!' },
      { type: 'contains', value: 'IsCompleted', message: '✅ Track order completion status!' },
    ],
    xpReward: 200,
    successMessage: "⚔️ BOTH wizards bow in respect! You've mastered two paradigms! +200 XP",
    failureMessage: "💫 The wizards shake their heads... Master BOTH approaches!",
    visualType: 'duel',
  },
  {
    id: 7,
    title: "The Grand Finale",
    subtitle: "E-Commerce System",
    description: "Build a complete mini e-commerce system using ALL your OOP knowledge!",
    story: `🏰 THE FINAL BOSS: Build a real-world e-commerce system!
    
Combine EVERYTHING you've learned: encapsulation, inheritance, polymorphism, interfaces, records!

Your quest: Create Product records, a Cart class, IDiscountable interface, and process a checkout!`,
    hint: "Use records for immutable data (Product), classes for stateful objects (Cart), interfaces for behaviors (IDiscountable). Apply the discount polymorphically!",
    starterCode: `// 🏰 THE FINAL BOSS: E-COMMERCE SYSTEM 🏰
// Use ALL your OOP knowledge!

// TODO: Create Product record
// record Product(int Id, string Name, decimal Price, string Category);

// TODO: Create IDiscountable interface
public interface IDiscountable
{
    decimal ApplyDiscount(decimal percentage);
}

// TODO: Create CartItem class implementing IDiscountable
public class CartItem : IDiscountable
{
    public Product Product { get; }
    public int Quantity { get; set; }
    
    // Implement ApplyDiscount
}

// TODO: Create ShoppingCart class
public class ShoppingCart
{
    private List<CartItem> _items;
    
    public void AddItem(Product product, int quantity) { }
    public decimal CalculateTotal() { }
    public void ApplyDiscountToAll(decimal percentage) { }
}

// TODO: Create Order record for completed purchases
// record Order(...)`,
    solution: `public record Product(int Id, string Name, decimal Price, string Category);

public interface IDiscountable
{
    decimal ApplyDiscount(decimal percentage);
    decimal CurrentPrice { get; }
}

public class CartItem : IDiscountable
{
    public Product Product { get; }
    public int Quantity { get; set; }
    public decimal CurrentPrice { get; private set; }
    
    public CartItem(Product product, int quantity)
    {
        Product = product;
        Quantity = quantity;
        CurrentPrice = product.Price;
    }
    
    public decimal ApplyDiscount(decimal percentage)
    {
        CurrentPrice = Product.Price * (1 - percentage / 100);
        return CurrentPrice;
    }
    
    public decimal GetTotal() => CurrentPrice * Quantity;
}

public class ShoppingCart
{
    private List<CartItem> _items = new();
    
    public IReadOnlyList<CartItem> Items => _items.AsReadOnly();
    
    public void AddItem(Product product, int quantity)
    {
        var existing = _items.FirstOrDefault(i => i.Product.Id == product.Id);
        if (existing != null)
            existing.Quantity += quantity;
        else
            _items.Add(new CartItem(product, quantity));
    }
    
    public decimal CalculateTotal() => _items.Sum(i => i.GetTotal());
    
    public void ApplyDiscountToAll(decimal percentage)
    {
        foreach (var item in _items)
            item.ApplyDiscount(percentage);
    }
}

public record CompletedOrder(
    int Id,
    IReadOnlyList<CartItem> Items,
    decimal Total,
    DateTime OrderDate
);`,
    validationRules: [
      { type: 'contains', value: 'record Product', message: '📦 Create a Product record!' },
      { type: 'contains', value: 'interface IDiscountable', message: '💸 Create the IDiscountable interface!' },
      { type: 'contains', value: ': IDiscountable', message: '✅ Implement IDiscountable!' },
      { type: 'contains', value: 'class ShoppingCart', message: '🛒 Create the ShoppingCart class!' },
      { type: 'containsAny', value: ['AddItem', 'Add('], message: '➕ Add method to add items to cart!' },
      { type: 'containsAny', value: ['CalculateTotal', 'GetTotal', 'Total()'], message: '💰 Add method to calculate total!' },
      { type: 'contains', value: 'private', message: '🔒 Use encapsulation!' },
      { type: 'containsAny', value: ['record CompletedOrder', 'record Order', 'class Order'], message: '📋 Create an Order type for completed purchases!' },
    ],
    xpReward: 300,
    successMessage: "🎉🎊 YOU'VE DEFEATED THE FINAL BOSS! You are now a TRUE OOP WIZARD! +300 XP",
    failureMessage: "💀 The e-commerce system crashes! Review your OOP foundations!",
    visualType: 'cart',
  },
];

export const getTotalXP = (): number => {
  return levels.reduce((sum, level) => sum + level.xpReward, 0);
};
