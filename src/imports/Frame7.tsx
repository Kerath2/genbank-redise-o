import imgCleanShot20251020At1527011 from "figma:asset/f307d2206a2e8fef226477808272567d3a55529f.png";
import imgCleanShot20251020At1541291 from "figma:asset/ba8ebc445099a53a0f5a0d3f97c6064ff0c837d5.png";
import imgInformation3 from "figma:asset/e677da0a00bcc96cdb28a9c806ab4735fdab72c8.png";
import imgDownArrow1 from "figma:asset/bcedc4b2b7d51499b885be3cbd4a2cfde3b64ad1.png";

function Frame2() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[100px] left-[16px] overflow-clip rounded-[10px] top-[38px] w-[193px]">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[70px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[17px] w-[173px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0">Quick tip</p>
        <p className="mb-0">Start by selecting a predefined example to see how BLASTP works with protein sequences.</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[100px] left-[16px] overflow-clip rounded-[10px] top-[170px] w-[193px]">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[70px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[17px] w-[173px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0">What is BLASTP?</p>
        <p>BLASTP compares your amino acid sequence against protein databases to find homologs and conserved domains.</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[100px] left-[17px] overflow-clip rounded-[10px] top-[299px] w-[193px]">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[70px] leading-[normal] left-[10px] not-italic text-[12px] text-black top-[8px] w-[173px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0">Common Parameters</p>
        <p className="mb-0">BLOSUM62 Matrix: Standard matrix for detecting similarity between moderately divergent proteins.</p>
        <p>E-value: Probability of finding a match by chance. Lower values = higher significance.</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-[#f6f6f6] h-[100px] left-[16px] overflow-clip rounded-[10px] top-[439px] w-[193px]">
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal h-[70px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[17px] w-[173px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0">Better practices</p>
        <p>For human protein searches, use RefSeq Select proteins. For evolutionary searches, use the nr database.</p>
      </div>
    </div>
  );
}

function Frame6() {
  return <div className="absolute h-[624px] left-[243px] top-[2px] w-[838px]" />;
}

function Frame() {
  return (
    <div className="absolute bg-[#d9d9d9] h-[912px] left-0 overflow-clip top-[94px] w-[226px]">
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return <div className="absolute bg-white h-[629px] left-[245px] top-[93px] w-[835px]" />;
}

function Frame1() {
  return (
    <div className="absolute bg-[#d9d9d9] h-[93px] left-0 overflow-clip top-0 w-[1080px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[30px] text-black text-nowrap top-[18px] whitespace-pre">BLASTP - Protein Search</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[44px] not-italic text-[20px] text-black text-nowrap top-[54px] whitespace-pre">{`Basic  Local Alignment Search Tool for protein secuences`}</p>
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[646px] overflow-clip px-[14px] py-[12px] rounded-[20px] top-[128px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">{` Hemoglobin`}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[418px] overflow-clip px-[14px] py-[12px] rounded-[20px] top-[128px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Protein Spike (SARS-CoV-2)</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[#d9d9d9] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[250px] overflow-clip px-[14px] py-[12px] rounded-[20px] top-[128px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Start from scratch</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[787px] overflow-clip px-[14px] py-[12px] rounded-[20px] top-[129px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Human Insulin</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-[#d9d9d9] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[25px] overflow-clip px-[14px] py-[12px] rounded-[5px] top-[45px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">{` Viral Protein Analysis`}</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-[rgba(217,217,217,0.85)] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[187px] overflow-clip px-[14px] py-[12px] rounded-[5px] top-[45px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre">Human Proteins</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-[rgba(217,217,217,0.85)] box-border content-stretch flex flex-col gap-[10px] items-center justify-center left-[659px] overflow-clip px-[14px] py-[12px] rounded-[5px] top-[11px] w-[107px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[19px] leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Save current</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-neutral-100 h-[90px] left-[250px] overflow-clip rounded-[5px] top-[203px] w-[798px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[34px] leading-[normal] left-[25px] not-italic text-[16px] text-black top-[11px] w-[248px]">Saved configurations</p>
      <Frame13 />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white h-[112px] left-[25px] rounded-[10px] top-[64px] w-[746px]">
      <div className="h-[112px] overflow-clip relative rounded-[inherit] w-[746px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[35px] leading-[normal] left-[12px] not-italic text-[#d9d9d9] text-[12px] top-[15px] w-[485px]">MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKR</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-white h-[40px] left-[28px] rounded-[10px] top-[234px] w-[746px]">
      <div className="h-[40px] overflow-clip relative rounded-[inherit] w-[746px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[35px] leading-[normal] left-[14px] not-italic text-[12px] text-black top-[12px] w-[485px]">Example: Omicron Analysis Variant</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-neutral-100 h-[289px] left-[250px] overflow-clip rounded-[5px] top-[318px] w-[798px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[25px] not-italic text-[16px] text-black top-[11px] w-[248px]">Protein Sequence</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[34px] leading-[normal] left-[32px] not-italic text-[16px] text-black top-[210px] w-[248px]">Search Tittle</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[31px] leading-[normal] left-[25px] not-italic text-[12px] text-black top-[33px] w-[376px]">
        Paste your sequence (FASTA format or accession number)
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Inria_Sans:Regular','Noto_Sans:Regular',sans-serif] h-[21px] leading-[normal] left-[28px] text-[12px] text-black top-[182px] w-[376px]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        ✓ Detected length: 87 amino acids
      </p>
      <Frame24 />
      <Frame16 />
      <div className="absolute h-[17px] left-[748px] top-[155px] w-[16px]" data-name="CleanShot 2025-10-20 at 15.27.01 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1527011} />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute bg-white h-[24px] left-[25px] rounded-[10px] top-[60px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">ClusteredNR (Recommended)</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-white h-[24px] left-[289px] rounded-[10px] top-[60px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">BLASTP (Standard)</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-white h-[27px] left-[567px] rounded-[10px] top-[60px] w-[216px]">
      <div className="h-[27px] overflow-clip relative rounded-[inherit] w-[216px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-[rgba(0,0,0,0.3)] top-[6px] w-[334px]">e.g., Homosapiens</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute bg-neutral-100 h-[128px] left-[250px] overflow-clip rounded-[5px] top-[620px] w-[798px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[34px] leading-[normal] left-[25px] not-italic text-[16px] text-black top-[11px] w-[248px]">Simple configuration</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[30px] not-italic text-[12px] text-black top-[40px] w-[200px]">Database</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[567px] not-italic text-[12px] text-black top-[39px] w-[200px]">
        <span>{`Organism `}</span>
        <span className="text-[rgba(0,0,0,0.43)]">(optional)</span>
      </p>
      <Frame26 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[30px] not-italic text-[12px] text-black top-[40px] w-[200px]">Database</p>
      <Frame26 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[294px] not-italic text-[12px] text-black top-[40px] w-[200px]">Algorithm</p>
      <Frame18 />
      <Frame17 />
      <div className="absolute left-[685px] size-[20px] top-[39px]" data-name="information 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInformation3} />
      </div>
      <div className="absolute left-[90px] size-[20px] top-[39px]" data-name="information 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInformation3} />
      </div>
      <div className="absolute left-[359px] size-[20px] top-[39px]" data-name="information 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInformation3} />
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-white h-[27px] left-[44px] rounded-[10px] top-[74px] w-[216px]">
      <div className="h-[27px] overflow-clip relative rounded-[inherit] w-[216px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[334px]">100</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute bg-white h-[27px] left-[303px] rounded-[10px] top-[74px] w-[216px]">
      <div className="h-[27px] overflow-clip relative rounded-[inherit] w-[216px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[334px]">10</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute bg-white h-[24px] left-[562px] rounded-[10px] top-[72px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">3</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-white h-[24px] left-[42px] rounded-[10px] top-[159px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">BLOSUM62</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-white h-[24px] left-[300px] rounded-[10px] top-[163px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">Existence: 11 Extension: 1</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-white h-[24px] left-[567px] rounded-[10px] top-[165px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">Enabled Recommended</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white h-[24px] left-[41px] rounded-[10px] top-[261px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[11px] not-italic text-[12px] text-black top-[6px] w-[182px]">Conditional compositional score</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-white h-[24px] left-[305px] rounded-[10px] top-[261px] w-[219px]">
      <div className="h-[24px] overflow-clip relative rounded-[inherit] w-[219px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[15px] leading-[normal] left-[4px] not-italic text-[12px] text-black top-[6px] w-[193px]">SEG (recommended for proteins)</p>
        <div className="absolute h-[24px] left-[193px] top-[2px] w-[26px]" data-name="CleanShot 2025-10-20 at 15.41.29 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCleanShot20251020At1541291} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute bg-neutral-100 h-[365px] left-[250px] overflow-clip rounded-[5px] top-[773px] w-[798px]">
      <div className="absolute flex items-center justify-center left-[741px] size-[43px] top-px">
        <div className="flex-none rotate-[180deg]">
          <div className="relative size-[43px]" data-name="down-arrow 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDownArrow1} />
          </div>
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[34px] leading-[normal] left-[28px] not-italic text-[16px] text-black top-[11px] w-[248px]">
        <span>{`Advance configuration `}</span>
        <span className="text-[rgba(0,0,0,0.49)]">(optional)</span>
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[44px] not-italic text-[12px] text-black top-[53px] w-[200px]">
        Max target sequences
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <Frame28 />
      <div className="absolute left-[173px] size-[20px] top-[53px]" data-name="information 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInformation3} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[303px] not-italic text-[12px] text-black top-[53px] w-[200px]">Expect threshold (E-value)</p>
      <Frame29 />
      <div className="absolute left-[461px] size-[20px] top-[52px]" data-name="information 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgInformation3} />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[567px] not-italic text-[12px] text-black top-[52px] w-[200px]">Word size</p>
      <Frame30 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[47px] not-italic text-[12px] text-black top-[139px] w-[200px]">
        Substitution matrix (R2, R14)
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[305px] not-italic text-[12px] text-black top-[143px] w-[200px]">Gap Cost</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[572px] not-italic text-[12px] text-black top-[145px] w-[200px]">
        Low complexity filter
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[46px] not-italic text-[12px] text-black top-[241px] w-[200px]">
        Compositional adjustments
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[20px] leading-[normal] left-[310px] not-italic text-[12px] text-black top-[241px] w-[200px]">
        Mask for low-complexity regions
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute bg-[#d9d9d9] box-border content-stretch flex flex-col gap-[10px] h-[57px] items-center justify-center left-[896px] overflow-clip px-[14px] py-[12px] rounded-[10px] top-[1210px] w-[152px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Start BLAST</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex flex-col gap-[10px] h-[57px] items-center justify-center left-[710px] overflow-clip px-[14px] py-[12px] rounded-[10px] top-[1210px] w-[152px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre">Reset</p>
    </div>
  );
}

export default function Frame34() {
  return (
    <div className="bg-white relative size-full">
      <Frame />
      <Frame1 />
      <Frame8 />
      <Frame9 />
      <Frame11 />
      <Frame10 />
      <Frame12 />
      <Frame25 />
      <Frame27 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
    </div>
  );
}