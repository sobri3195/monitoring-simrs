const SatusehatResourceTable = ({ item }) => {
  const rows = [
    ['Organization FHIR', item.statusOrganisasiFhir],
    ['Practitioner FHIR', item.statusPractitionerFhir],
    ['Location FHIR', item.statusLocationFhir],
    ['Encounter FHIR', item.statusEncounterFhir],
    ['Patient Sync', item.statusPatientSync],
    ['Observation Sync', item.statusObservationSync],
    ['Medication Sync', item.statusMedicationSync],
    ['Claim Sync', item.statusClaimSync],
  ];
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-t border-slate-100">
            <td className="py-2 text-slate-600">{label}</td><td className="py-2 font-medium">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SatusehatResourceTable;
