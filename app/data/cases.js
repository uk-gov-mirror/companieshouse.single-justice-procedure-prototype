module.exports = [
  {
    id: 0,
    reference: 'RR00000001',
    status: 'Referred',
    referred: '11 Sep 2018',
    referrer: 'Joanne Wiley',
    priority: 'normal',
    bookmarked: true,
    company: {
      name: 'TEMPLETON METALWORK LIMITED',
      number: '00374659',
      incorporationDate: '9 January 2012',
      status: 'active',
      type: 'Private Limited Company',
      registeredOffice: {
        line1: 'Unit 5, Western Industrial Estate',
        line2: 'Western Road',
        town: 'Cardiff',
        county: 'Cardiff County',
        postcode: 'CF11 8TJ',
        country: 'United Kingdom'
      },
      accountsMUD: '30 June 2017',
      accountsDue: '30 June 2018',
      lastAccountsMUD: '30 June 2016',
      csDate: '13 April 2019',
      csDue: '27 April 2019',
      lastCSDate: '13 April 2018',
      officers: [
        {
          name: 'Matthew Blakemoor',
          dateOfBirth: '16 January 1965',
          status: 'active',
          role: 'Director',
          appointed: '25 June 1995',
          nationality: 'British',
          occupation: 'Metal worker',
          serviceAddress: {
            line1: 'Unit 5, Western Industrial Estate',
            line2: 'Western Road',
            town: 'Cardiff',
            county: 'Cardiff County',
            postcode: 'CF11 8TJ',
            country: 'United Kingdom'
          },
          residentialAddress: {
            line1: '25 Muir Lane',
            line2: '',
            town: 'Caerphilly',
            county: 'Caerphilly County',
            postcode: 'CF83 5RD',
            country: 'United Kingdom'
          }
        }
      ],
      filings: [
        {
          type: 'AR01',
          date: '8 Apr 2015',
          name: 'Annual Return',
          status: 'accepted',
          label: '31/03/15 Full List',
          link: 'file.pdf'
        },
        {
          type: 'AA',
          date: '30 Dec 2015',
          name: 'Annual Accounts',
          status: 'accepted',
          label: '30/06/15 Total Exemption Small',
          link: ''
        },
        {
          type: 'AR01',
          date: '21 Apr 2016',
          name: 'Annual Return',
          status: 'accepted',
          label: '31/03/16 Full List',
          link: ''
        },
        {
          type: 'AA',
          date: '5 Dec 2016',
          name: 'Annual Accounts',
          status: 'accepted',
          label: '30/06/16 Total Exemption Small',
          link: ''
        },
        {
          type: 'CSREM',
          date: '28 Mar 2017',
          name: 'Confirmation Statement Reminder',
          status: 'issued',
          label: 'CSREM 28/03/17 - Issued exist...',
          link: ''
        },
        {
          type: 'CS01',
          date: '13 Apr 2017',
          name: 'Confirmation Statement',
          status: 'accepted',
          label: 'Confirmation statement made on ...',
          link: ''
        },
        {
          type: 'REM2A',
          date: '5 Dec 2017',
          name: 'Annual Accounts Reminder',
          status: 'issued',
          label: 'Annual Accounts Reminder',
          link: ''
        },
        {
          type: 'CS01',
          date: '13 Apr 2018',
          name: 'Confirmation Statement',
          status: 'accepted',
          label: 'Confirmation statement made on ...',
          link: ''
        },
        {
          type: 'DEFSTAT',
          date: '30 Apr 2018',
          name: 'Overdue Accounts',
          status: 'issued',
          label: '',
          link: ''
        },
        {
          type: 'DEF3',
          date: '31 May 2018',
          name: 'Overdue Accounts',
          status: 'issued',
          label: '',
          link: ''
        },
        {
          type: 'PTF',
          date: '10 Jun 2018',
          name: 'Promise To File',
          status: 'accepted',
          label: 'Original message...',
          link: ''
        },
        {
          type: 'PTF',
          date: '10 Jun 2018',
          name: 'Promise To File',
          status: 'issued',
          label: 'Original message...',
          link: ''
        },
        {
          type: 'DEF49',
          date: '31 Jul 2018',
          name: 'Reminder',
          status: 'issued',
          label: 'Overdue Accounts',
          link: ''
        }
      ],
      overdue: [
        {
          type: 'AA',
          periodStart: '1 Jul 2016',
          periodEnd: '30 Jun 2017',
          dueDate: '31 Mar 2018',
          name: 'Annual accounts'
        }
      ]
    },
    documents: [
      {
        type: 'PTF',
        date: ''
      },
      {
        type: 'DEF49',
        date: '',
        mode: 'AC,AR'
      },
      {
        type: 'PROS9',
        date: ''
      },
      {
        type: 'PROS4',
        date: ''
      },
      {
        type: 'ultimatum',
        date: ''
      },
      {
        type: 'SJPN',
        date: ''
      }
    ],
    contacts: [
      {
        type: 'incoming',
        mode: 'phone',
        name: '',
        contactPhone: '',
        contactEmail: '',
        role: '',
        date: '2 Jun 2018',
        time: '',
        notes: 'Company promises to file its accounts',
        attachments: []
      },
      {
        type: 'incoming',
        mode: 'letter',
        name: '',
        contactPhone: '',
        contactEmail: '',
        role: '',
        date: '8 Jun 2018',
        time: '',
        notes: 'Company promises to file its accounts by end of month',
        attachments: []
      }
    ],
    defendants: [
      {
        id: 0,
        name: 'Matthew Blakemoor',
        dateOfBirth: '16 January 1965',
        status: 'active',
        role: 'Director',
        appointed: '25 June 1995',
        addressType: 'service',
        address: {
          line1: 'Unit 5, Western Industrial Estate',
          line2: 'Western Road',
          town: 'Cardiff',
          county: 'Cardiff County',
          postcode: 'CF11 8TJ',
          country: 'United Kingdom'
        },
        offences: [
          {
            id: 0,
            type: 'AA',
            status: 'open',
            date: '1 March 2018',
            periodStart: '1 Jul 2016',
            periodEnd: '30 Jun 2017',
            dueDate: '31 Mar 2018',
            hearingDate: {
              day: '',
              month: '',
              year: ''
            },
            plea: '',
            outcome: {
              type: '',
              fine: 0,
              costs: 0,
              duration: 0
            }
          }
        ]
      }
    ],
    witnesses: [
      {
        id: 0,
        name: '',
        date: '',
        status: '',
        link: ''
      }
    ],
    history: [
      {
        date: '11 September 2018',
        notes: 'Case referred to prosecution by COT.',
        time: '09:35',
        title: 'Case referred',
        user: 'Joanne Wiley'
      }
    ]
  },
  {
    id: 1,
    reference: 'CR00000001',
    status: 'Awaiting outcomes',
    referred: '11 Mar 2018',
    referrer: 'Joanne Wiley',
    priority: 'normal',
    bookmarked: true,
    ultimatumGenerated: true,
    sjpnGenerated: true,
    company: {
      name: 'WILKINS GLAZING LIMITED',
      number: '00345567',
      incorporationDate: '9 January 2012',
      status: 'active',
      type: 'Private Limited Company',
      registeredOffice: {
        line1: 'Unit 5, Western Industrial Estate',
        line2: 'Western Road',
        town: 'Cardiff',
        county: 'Cardiff County',
        postcode: 'CF11 8TJ',
        country: 'United Kingdom'
      },
      accountsMUD: '30 June 2017',
      accountsDue: '30 June 2018',
      lastAccountsMUD: '30 June 2016',
      csDate: '13 April 2019',
      csDue: '27 April 2019',
      lastCSDate: '13 April 2018',
      officers: [
        {
          name: 'Matthew Blakemoor',
          dateOfBirth: '16 January 1965',
          status: 'active',
          role: 'Director',
          appointed: '25 June 1995',
          nationality: 'British',
          occupation: 'Metal worker',
          serviceAddress: {
            line1: 'Unit 5, Western Industrial Estate',
            line2: 'Western Road',
            town: 'Cardiff',
            county: 'Cardiff County',
            postcode: 'CF11 8TJ',
            country: 'United Kingdom'
          },
          residentialAddress: {
            line1: '25 Muir Lane',
            line2: '',
            town: 'Caerphilly',
            county: 'Caerphilly County',
            postcode: 'CF83 5RD',
            country: 'United Kingdom'
          }
        }
      ],
      filings: [
        {
          type: 'AR01',
          date: '8 Apr 2015',
          name: 'Annual Return',
          status: 'accepted',
          label: '31/03/15 Full List',
          link: 'file.pdf'
        },
        {
          type: 'AA',
          date: '30 Dec 2015',
          name: 'Annual Accounts',
          status: 'accepted',
          label: '30/06/15 Total Exemption Small',
          link: ''
        },
        {
          type: 'AR01',
          date: '21 Apr 2016',
          name: 'Annual Return',
          status: 'accepted',
          label: '31/03/16 Full List',
          link: ''
        },
        {
          type: 'AA',
          date: '5 Dec 2016',
          name: 'Annual Accounts',
          status: 'accepted',
          label: '30/06/16 Total Exemption Small',
          link: ''
        },
        {
          type: 'CSREM',
          date: '28 Mar 2017',
          name: 'Confirmation Statement Reminder',
          status: 'issued',
          label: 'CSREM 28/03/17 - Issued exist...',
          link: ''
        },
        {
          type: 'CS01',
          date: '13 Apr 2017',
          name: 'Confirmation Statement',
          status: 'accepted',
          label: 'Confirmation statement made on ...',
          link: ''
        },
        {
          type: 'REM2A',
          date: '5 Dec 2017',
          name: 'Annual Accounts Reminder',
          status: 'issued',
          label: 'Annual Accounts Reminder',
          link: ''
        },
        {
          type: 'CS01',
          date: '13 Apr 2018',
          name: 'Confirmation Statement',
          status: 'accepted',
          label: 'Confirmation statement made on ...',
          link: ''
        },
        {
          type: 'DEFSTAT',
          date: '30 Apr 2018',
          name: 'Overdue Accounts',
          status: 'issued',
          label: '',
          link: ''
        },
        {
          type: 'DEF3',
          date: '31 May 2018',
          name: 'Overdue Accounts',
          status: 'issued',
          label: '',
          link: ''
        },
        {
          type: 'PTF',
          date: '10 Jun 2018',
          name: 'Promise To File',
          status: 'accepted',
          label: 'Original message...',
          link: ''
        },
        {
          type: 'PTF',
          date: '10 Jun 2018',
          name: 'Promise To File',
          status: 'issued',
          label: 'Original message...',
          link: ''
        },
        {
          type: 'DEF49',
          date: '31 Jul 2018',
          name: 'Reminder',
          status: 'issued',
          label: 'Overdue Accounts',
          link: ''
        }
      ],
      overdue: [
        {
          type: 'AA',
          periodStart: '1 Jul 2016',
          periodEnd: '30 Jun 2017',
          dueDate: '31 Mar 2018',
          name: 'Annual accounts'
        }
      ]
    },
    documents: [
      {
        type: 'PTF',
        date: ''
      },
      {
        type: 'DEF49',
        date: '',
        mode: 'AC,AR'
      },
      {
        type: 'PROS9',
        date: ''
      },
      {
        type: 'PROS4',
        date: ''
      },
      {
        type: 'ultimatum',
        date: ''
      },
      {
        type: 'SJPN',
        date: ''
      }
    ],
    contacts: [
      {
        type: 'incoming',
        mode: 'phone',
        name: '',
        contactPhone: '',
        contactEmail: '',
        role: '',
        date: '2 Jun 2018',
        time: '',
        notes: 'Company promises to file its accounts',
        attachments: []
      },
      {
        type: 'incoming',
        mode: 'letter',
        name: '',
        contactPhone: '',
        contactEmail: '',
        role: '',
        date: '8 Jun 2018',
        time: '',
        notes: 'Company promises to file its accounts by end of month',
        attachments: []
      }
    ],
    defendants: [
      {
        id: 0,
        name: 'Matthew Blakemoor',
        dateOfBirth: '16 January 1965',
        status: 'active',
        role: 'Director',
        appointed: '25 June 1995',
        addressType: 'service',
        address: {
          line1: 'Unit 5, Western Industrial Estate',
          line2: 'Western Road',
          town: 'Cardiff',
          county: 'Cardiff County',
          postcode: 'CF11 8TJ',
          country: 'United Kingdom'
        },
        offences: [
          {
            id: 0,
            type: 'AA',
            status: 'proceed',
            date: '1 March 2018',
            periodStart: '1 Jul 2016',
            periodEnd: '30 Jun 2017',
            dueDate: '31 Mar 2018',
            hearingDate: {
              day: '',
              month: '',
              year: ''
            },
            plea: '',
            outcome: {
              type: '',
              fine: 0,
              costs: 0,
              duration: 0
            }
          }
        ]
      }
    ],
    witnesses: [
      {
        id: 0,
        name: '',
        date: '',
        status: '',
        link: ''
      }
    ],
    history: [
      {
        date: '11 September 2018',
        notes: 'Case referred to prosecution by COT.',
        time: '09:35',
        title: 'Case referred',
        user: 'Joanne Wiley'
      },
      {
        date: 28,
        notes: '',
        time: 1551360007337,
        title: 'Case accepted',
        user: 'system'
      },
      {
        date: 28,
        notes: 'Ultimatum sent to the defendant',
        time: 1551360013874,
        title: 'Ultimatum issued',
        user: 'system'
      },
      {
        date: 28,
        notes: 'Ultimatum period expired without response',
        time: 1551360021980,
        title: 'Ultimatum expired',
        user: 'system'
      },
      {
        date: 28,
        notes: 'SJPN issued to defendant and queued for delivery to court',
        time: 1551360033148,
        title: 'SJPN issued',
        user: 'system'
      },
      {
        date: 28,
        notes: 'SJPN expired, now waiting for court outcomes',
        time: 1551360040219,
        title: 'SJPN expired',
        user: 'system'
      }
    ]
  }
]
