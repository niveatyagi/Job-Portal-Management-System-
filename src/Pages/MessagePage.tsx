import { IconPencil, IconDotsVertical } from "@tabler/icons-react";

const chats = [
  { id: 1, name: "Phoebe R.", lastMessage: "Hi Nivea, I'm recruiter at...", time: "10:48 AM" },
  { id: 2, name: "Anjani Kumar", lastMessage: "Hi, how are you doing?", time: "Oct 14" },
  { id: 3, name: "Vagish Maurya", lastMessage: "Hey!", time: "Oct 14" },
  { id: 4, name: "Deepak Kumar", lastMessage: "Hi Nivea, it’s great to...", time: "Aug 26" },
];

const MessagePage = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white pt-20 px-10 pb-10 font-['Poppins'] flex flex-col">
      
      {/* 🔹 Top Header Bar */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
        <h1 className="text-xl font-semibold">Messaging</h1>
        <div className="flex gap-4">
          <IconPencil className="cursor-pointer hover:text-bright-sun-400" />
          <IconDotsVertical className="cursor-pointer hover:text-bright-sun-400" />
        </div>
      </div>

      {/* 🔹 Main Messaging Layout */}
      <div className="flex flex-1 border border-gray-800 rounded-2xl overflow-hidden">
        
        {/* Left Sidebar - Chat List */}
        <div className="w-1/3 border-r border-gray-800 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="p-4 hover:bg-mine-shaft-900 cursor-pointer flex justify-between items-center border-b border-gray-800"
            >
              <div>
                <p className="font-medium">{chat.name}</p>
                <p className="text-sm text-gray-400 truncate w-48">
                  {chat.lastMessage}
                </p>
              </div>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
          ))}
        </div>

        {/* Right Side - Message Thread */}
        <div className="flex-1 flex flex-col justify-between bg-mine-shaft-900">
          <div className="p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold">Phoebe R.</h2>
            <p className="text-sm text-gray-400 mb-4">
              Recruiter at DataAnnotation
            </p>

            <div className="space-y-3 text-sm leading-relaxed">
              <p>Hi Nivea,</p>
              <p>
                I'm a recruiter at DataAnnotation, where we pay smart folks to
                train AI. Your profile stood out to me as we are seeking bilingual
                English and Hindi professionals.
              </p>
              <p>Here are a few highlights:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Earn $1K+ USD weekly paid via PayPal 💰</li>
                <li>Completely remote 🏡</li>
                <li>Work your own schedule 💻</li>
                <li>No AI experience required 😇</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex justify-around p-4 border-t border-gray-800">
            <button className="bg-bright-sun-400 text-black px-4 py-2 rounded-xl hover:bg-bright-sun-500 font-medium">
              Sign Up
            </button>
            <button className="border border-gray-500 px-4 py-2 rounded-xl hover:bg-gray-700 font-medium">
              Not Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
