import React, { useState } from 'react';
import { FileText, ExternalLink, MapPin, ArrowRightLeft, Palmtree, MountainSnow } from 'lucide-react';

type FlowType = 'hawaii' | 'parkcity' | 'offboarding';

export const ProcessFlowGuide = () => {
  const [activeFlow, setActiveFlow] = useState<FlowType>('hawaii');

  const hawaiiSections = [
    {
      role: 'Sales (Violet/Justin)',
      items: [
        'Email Admin with Owner Info, Terms, Property Details, and Transition Details.',
        'Update "Future Bookings" on the Dashboard.'
      ]
    },
    {
      role: 'Onboarding Admin',
      items: [
        'Create folder in Owner’s File Cabinet (Label with Unit #).',
        'Create "Documents" and "Taxes" folders inside the unit folder.',
        'Copy/Paste Onboarding Tracker template if doing manual backup.',
        { 
           text: 'Get TMK # from County Records Site (Parcel #)', 
           link: 'https://qpublic.schneidercorp.com/Application.aspx?AppID=1048&LayerID=23618&PageTypeID=2&PageID=9876' 
        },
        'Add Owner Information from contract (leave blank if missing).',
        'Work with Violet to transfer reservations.'
      ]
    },
    {
      role: 'Wiki Setup (Janel)',
      items: [
        'Upload Property Management Agreement to "Documents" folder.',
        'Schedule Photographer (upload schedule to breezeway).',
        'Upload photos to Wiki (Max 35 images) sorted: lanai -> living -> dining -> kitchen -> beds -> baths.',
        {
           text: 'Connect Property to Homeowner Profile in Admin',
           link: 'https://admin.kbmhawaii.com/property-profile'
        },
        'Set Standard Mgmt Commission (25%).',
        'Set 4 free housekeeping cleans & 14 days free rental car.',
        'Sync to YieldMax.',
        'Add Taxes & Fees numerically.'
      ]
    },
    {
      role: 'Accounting (Mei/Lorry)',
      items: [
        'Create Tax Account & Owner Statement.',
        'Request W9, Tax Login/Letter ID from homeowner.',
        'Send DocuSign request.',
        'Upload tax info to "Taxes" folder.',
        'Update Legal section in Dashboard.'
      ]
    },
    {
      role: 'Field Ops (Kevin/Kyle)',
      items: [
        'Install Kaba Locks on transition date.',
        'Complete Property Inspection.',
        'Gather Amenities details.',
        'Verify Wifi/Cable setup.',
        'Add Inventory to unit.'
      ]
    },
    {
      role: 'Go Live (Marketing)',
      items: [
        'Publish unit on Wiki, Rentals United, and OTAs.',
        'Turn on Owner Portal.',
        'Send "Live" email to Homeowner.',
        'Send "President\'s Welcome" email (wait until Date of Management).'
      ]
    }
  ];

  const parkCitySections = [
    {
      role: 'General Manager (Judy)',
      items: [
        'Receive signed contract.',
        'Create Unit Name (e.g., VIN-17).',
        'Set initial rates.',
        'Assign Bucket List Name (details provided by Sarah).',
        'Create Folder for unit in Owner Filing Cabinet master folder.',
        'Draft the property description.',
        'Upload property details, owner information, and all pertinent tabs into Admin.',
        'Add any reservations as needed (owner reservations or to honor existing bookings).',
        'Activate the Owner Portal.',
        'Update Owner Statements with the new unit information and any additional notes.',
        'Arrange for professional staging and photography.',
        'Once photos are received, upload them into Admin.'
      ]
    },
    {
      role: 'Marketing (Emily)',
      items: [
        'After all onboarding tasks are complete and ready for marketing, onboard to OTAs.'
      ]
    },
    {
      role: 'Finalization (Judy)',
      items: [
        'Notify Accounting to ensure the W9/ACH information and tax details are correct.',
        'Email owners Owner Portal link.'
      ]
    }
  ];

  const offboardingSections = [
    {
      role: 'Sales (Violet)',
      items: [
        'Notify Admin (emily@kbmresorts.com) of offboarding including: Owner Info, Offboarding Date, Reason for Offboarding.',
      ]
    },
    {
      role: 'Admin (Wiki Updates)',
      items: [
        'Settings > Channels > Change "Show Public Calendar" and "Enable Book Online" to NO.',
        'Settings > Overview > Change "Listing Status" to Suspended.',
        '(Note: Change to Archived only after all guests checked out and statements sent).'
      ]
    },
    {
      role: 'Admin (Internal)',
      items: [
        'Update Offboarding Tracker / Owner Exits spreadsheet.',
        'Notify Teams (Field Ops, Kevin, Kyle, Janel) with: Offboarding Date, Access removal requirements, Final inspection request, Utility shutdown instructions.',
        'Archive Owner Folder in Filing Cabinet.',
        'Move Unit Folder to "Inactive Units" in G Drive.'
      ]
    },
    {
      role: 'Accounting (Mei)',
      items: [
        'Finalize Owner Statement.',
        'Close Tax Account (if necessary).',
        'Notify owner of any outstanding balances.'
      ]
    },
    {
      role: 'Field Operations (Kevin/Kyle)',
      items: [
        'Change Locks / Retrieve Keys.',
        'Complete Final Property Inspection.',
        'Deep clean.',
        'Remove Inventory (if applicable).'
      ]
    },
    {
      role: 'Update Listings (Emily)',
      items: [
        'Remove unit from VRBO, Expedia, AirBnB, and other OTA platforms.',
        'Remove from KBM Resorts website.'
      ]
    },
    {
      role: 'Final Confirmation',
      items: [
        'Send final offboarding email to the homeowner confirming completion.'
      ]
    }
  ];

  const getCurrentSections = () => {
    switch (activeFlow) {
      case 'parkcity': return parkCitySections;
      case 'offboarding': return offboardingSections;
      default: return hawaiiSections;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Process Guidelines (SOP)</h1>
        <p className="text-gray-500 mt-2">Standard Operating Procedures for Onboarding & Offboarding</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveFlow('hawaii')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
            activeFlow === 'hawaii'
              ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Palmtree size={18} />
          Hawaii Onboarding
        </button>
        <button
          onClick={() => setActiveFlow('parkcity')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
            activeFlow === 'parkcity'
              ? 'bg-blue-600 text-white ring-2 ring-blue-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <MountainSnow size={18} />
          Park City Onboarding
        </button>
        <button
          onClick={() => setActiveFlow('offboarding')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
            activeFlow === 'offboarding'
              ? 'bg-red-600 text-white ring-2 ring-red-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <ArrowRightLeft size={18} />
          Offboarding
        </button>
      </div>

      {/* Content */}
      <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeFlow}">
        {getCurrentSections().map((section, idx) => (
          <div key={idx} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${activeFlow === 'offboarding' ? 'border-red-100' : 'border-gray-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-3 ${
                activeFlow === 'offboarding' ? 'bg-red-50 border-red-100' : 
                activeFlow === 'parkcity' ? 'bg-blue-50 border-blue-100' : 'bg-indigo-50 border-indigo-100'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ${
                 activeFlow === 'offboarding' ? 'bg-white text-red-600' : 
                 activeFlow === 'parkcity' ? 'bg-white text-blue-600' : 'bg-white text-indigo-600'
              }`}>
                {idx + 1}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{section.role}</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        activeFlow === 'offboarding' ? 'bg-red-400' : 
                        activeFlow === 'parkcity' ? 'bg-blue-400' : 'bg-indigo-400'
                    }`} />
                    {typeof item === 'string' ? (
                      <span>{item}</span>
                    ) : (
                      <span>
                        {item.text}
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 ml-2 text-indigo-600 hover:underline font-medium"
                        >
                          Open Link <ExternalLink size={12} />
                        </a>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};