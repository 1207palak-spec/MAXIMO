import React from 'react';
import { PowerPlant } from '../../experience/zones/PowerPlant';
import { TransformerChamber } from '../../experience/zones/TransformerChamber';
import { TransmissionCorridor } from '../../experience/zones/TransmissionCorridor';
import { Substation } from '../../experience/zones/Substation';
import { IndustrialFacility } from '../../experience/zones/IndustrialFacility';
import { SmartGrid } from '../../experience/zones/SmartGrid';
import { RenewablePark } from '../../experience/zones/RenewablePark';

export const WorldDirector: React.FC = () => {
  return (
    <group>
      <PowerPlant />
      <TransformerChamber />
      <TransmissionCorridor />
      <Substation />
      <IndustrialFacility />
      <SmartGrid />
      <RenewablePark />
    </group>
  );
};
