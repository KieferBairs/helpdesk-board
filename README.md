This is a Helpdesk ticket board made with react for ISM3232

<!-- Run And Install  -->

git clone <https://github.com/KieferBairs/helpdesk-board>
cd helpdesk-board
npm install

<!-- Start the Server -->
npm run dev
then visit: http://localhost:3000

<!-- Project Strucutre -->
src/
 ├── app/
 │   ├── page.js                # Server component (renders heading + Board)
 │   ├── api/
 │   │   └── tickets/route.js   # API route returning ticket JSON
 │   └── components/            # Client components
 │       ├── Board.jsx
 │       ├── TicketList.jsx
 │       ├── TicketCard.jsx
 │       ├── StatusFilter.jsx
 │       ├── PriorityFilter.jsx
 │       ├── SearchBox.jsx
 │       ├── MyQueueSummary.jsx
 │       └── StatusMessage.jsx
 └── app/lib/
     └── severity.js            # Priority and status maps
