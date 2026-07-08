import { Engine } from './core/Engine/Engine';
import { BusinessHUD } from './ui/BusinessHUD/BusinessHUD';
import { DigitalTwinHUD } from './ui/DigitalTwinHUD/DigitalTwinHUD';

function App() {
  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden text-white font-sans">
      <Engine />
      <BusinessHUD />
      <DigitalTwinHUD />
    </div>
  );
}

export default App;
