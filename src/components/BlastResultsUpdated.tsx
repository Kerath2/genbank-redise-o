// This file contains the update needed for the Graphic View section to show selected sequences

// Replace line 1187 from:
// {filteredResults.slice(0, 8).map((result: any, index) => {

// To:
// {(selectedSeqs.size > 0 
//   ? filteredResults.filter((r: any) => selectedSeqs.has(r.id)) 
//   : filteredResults.slice(0, 8)
// ).map((result: any, index) => {

// And add before line 1185:
/*
{selectedSeqs.size > 0 && (
  <div className="bg-[#FFF4F9] border border-[#FC10C3]/20 rounded-lg p-3">
    <p className="text-sm text-[#1E1E1E]">
      Mostrando {selectedSeqs.size} {selectedSeqs.size === 1 ? 'secuencia seleccionada' : 'secuencias seleccionadas'}
    </p>
  </div>
)}
*/
