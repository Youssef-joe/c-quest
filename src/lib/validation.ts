import { ValidationRule, ValidationResult } from '@/types/game';

export function validateCode(code: string, rules: ValidationRule[]): ValidationResult {
  const failedRules: string[] = [];
  
  for (const rule of rules) {
    const passed = checkRule(code, rule);
    if (!passed) {
      failedRules.push(rule.message);
    }
  }
  
  if (failedRules.length === 0) {
    return {
      success: true,
      message: 'All checks passed!',
    };
  }
  
  return {
    success: false,
    message: `${failedRules.length} issue${failedRules.length > 1 ? 's' : ''} found`,
    details: failedRules,
  };
}

function checkRule(code: string, rule: ValidationRule): boolean {
  const normalizedCode = code.replace(/\s+/g, ' ').trim();
  
  switch (rule.type) {
    case 'contains':
      return normalizedCode.toLowerCase().includes((rule.value as string).toLowerCase());
      
    case 'notContains':
      return !normalizedCode.toLowerCase().includes((rule.value as string).toLowerCase());
      
    case 'regex':
      try {
        const regex = new RegExp(rule.value as string, 'gi');
        return regex.test(code);
      } catch {
        return false;
      }
      
    case 'containsAll':
      return (rule.value as string[]).every(v => 
        normalizedCode.toLowerCase().includes(v.toLowerCase())
      );
      
    case 'containsAny':
      return (rule.value as string[]).some(v => 
        normalizedCode.toLowerCase().includes(v.toLowerCase())
      );
      
    default:
      return false;
  }
}

export function getRandomFailMessage(): string {
  const messages = [
    "🐛 Bugs detected in your spell!",
    "💀 The compiler ghost is NOT happy...",
    "🔥 Your code set the server on fire (metaphorically)!",
    "😈 The goblin laughs at your attempt!",
    "🍝 More spaghetti than code!",
    "⚡ Syntax error in the magical realm!",
    "🎭 The OOP gods are displeased...",
    "🐉 The dragon of bad practices awakens!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getRandomSuccessMessage(): string {
  const messages = [
    "✨ Magical! Your code sparkles!",
    "🧙‍♂️ The Code Wizard approves!",
    "🎯 Perfect encapsulation!",
    "⚔️ You've slain the bug!",
    "🏆 Legendary coding skills!",
    "🌟 Your abstraction is beautiful!",
    "🔮 The crystal ball sees clean code!",
    "🦄 Unicorn-level programming!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
