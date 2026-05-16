
export const STATUS_CONFIG = {
  U: {
    label: "Пользователь",
    color: "blue",
    icon: "👤",
  },
  W: {
    label: "Сотрудник",
    color: "green",
    icon: "👨‍💼",
  },
  A: {
    label: "Администратор",
    color: "red",
    icon: "👑",
  },
  S: {
    label: "Программист",
    color: "purple",
    icon: "💻",
  },
};

export const STATUS_DISPLAY = {
  U: "Пользователь",
  W: "Сотрудник",
  A: "Администратор",
  S: "Программист",
};


export default function StatusUser(status) {
 
  let displayText;
  if (typeof status === "string") {
    displayText = STATUS_DISPLAY[status] || "неведомо как...";
  } else {
    displayText = STATUS_DISPLAY[status.status] || "неведомо как...";
  }

  return displayText;
}
