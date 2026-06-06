import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, PersonalInfo, WorkExperience, Education, CVVersion, TemplateId, SocialLink, Skill } from '../types/cv';

export const INITIAL_DATA: CVData = {
  personal: { 
    fullName: '', 
    email: '', 
    phone: '', 
    address: '', 
    summary: '', 
    photo: '', 
    links: [],
    dob: '',
    pob: '',
    gender: ''
  },
  work: [],
  education: [],
  skills: [],
  interests: []
};

interface CVState {
  versions: CVVersion[];
  activeVersionId: string | null;
  activeSection: string;
  
  // Getters
  getActiveVersion: () => CVVersion | undefined;
  
  // Global Actions
  setActiveSection: (section: string) => void;
  createVersion: (name: string, templateId?: TemplateId) => void;
  cloneVersion: (id: string, newName: string) => void;
  deleteVersion: (id: string) => void;
  loadVersion: (id: string) => void;
  setTemplate: (templateId: TemplateId) => void;

  // Data Actions (Active Version)
  updatePersonal: (info: Partial<PersonalInfo>) => void;
  addLink: () => void;
  updateLink: (id: string, info: Partial<SocialLink>) => void;
  removeLink: (id: string) => void;
  addWork: () => void;
  updateWork: (index: number, info: Partial<WorkExperience>) => void;
  removeWork: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, info: Partial<Education>) => void;
  removeEducation: (index: number) => void;
  addSkill: () => void;
  updateSkill: (id: string, info: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  updateInterests: (interests: string[]) => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      versions: [],
      activeVersionId: null,
      activeSection: 'personal',

      getActiveVersion: () => {
        const { versions, activeVersionId } = get();
        return versions.find(v => v.id === activeVersionId);
      },

      setActiveSection: (section) => set({ activeSection: section }),

      createVersion: (name, templateId = 'template-1') => {
        const newVersion: CVVersion = {
          id: crypto.randomUUID(),
          name,
          templateId,
          data: JSON.parse(JSON.stringify(INITIAL_DATA)),
          updatedAt: Date.now()
        };
        set((state) => ({
          versions: [...state.versions, newVersion],
          activeVersionId: newVersion.id
        }));
      },

      cloneVersion: (id, newName) => {
        const target = get().versions.find(v => v.id === id);
        if (!target) return;

        const newVersion: CVVersion = {
          ...JSON.parse(JSON.stringify(target)),
          id: crypto.randomUUID(),
          name: newName,
          updatedAt: Date.now()
        };
        set((state) => ({
          versions: [...state.versions, newVersion],
          activeVersionId: newVersion.id
        }));
      },

      deleteVersion: (id) => set((state) => ({
        versions: state.versions.filter(v => v.id !== id),
        activeVersionId: state.activeVersionId === id ? null : state.activeVersionId
      })),

      loadVersion: (id) => set({ activeVersionId: id }),

      setTemplate: (templateId) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { ...v, templateId, updatedAt: Date.now() }
            : v
        )
      })),

      updatePersonal: (info) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { ...v, data: { ...v.data, personal: { ...v.data.personal, ...info } }, updatedAt: Date.now() }
            : v
        )
      })),

      addLink: () => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  personal: { 
                    ...v.data.personal, 
                    links: [...(v.data.personal.links ?? []), { id: crypto.randomUUID(), platform: '', url: '' }] 
                  } 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      updateLink: (id, info) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  personal: { 
                    ...v.data.personal, 
                    links: (v.data.personal.links ?? []).map(l => l.id === id ? { ...l, ...info } : l) 
                  } 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      removeLink: (id) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  personal: { 
                    ...v.data.personal, 
                    links: (v.data.personal.links ?? []).filter(l => l.id !== id) 
                  } 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      addWork: () => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { ...v.data, work: [...v.data.work, { company: '', position: '', startDate: '', endDate: '', description: [] }] }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      updateWork: (index, info) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { ...v.data, work: v.data.work.map((item, i) => i === index ? { ...item, ...info } : item) }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      removeWork: (index) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { ...v, data: { ...v.data, work: v.data.work.filter((_, i) => i !== index) }, updatedAt: Date.now() }
            : v
        )
      })),

      addEducation: () => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { ...v.data, education: [...v.data.education, { school: '', degree: '', graduationDate: '' }] }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      updateEducation: (index, info) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { ...v.data, education: v.data.education.map((item, i) => i === index ? { ...item, ...info } : item) }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      removeEducation: (index) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { ...v, data: { ...v.data, education: v.data.education.filter((_, i) => i !== index) }, updatedAt: Date.now() }
            : v
        )
      })),

      addSkill: () => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  skills: [...v.data.skills, { id: crypto.randomUUID(), name: '', level: 3 }] 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      updateSkill: (id, info) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  skills: v.data.skills.map(s => s.id === id ? { ...s, ...info } : s) 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      removeSkill: (id) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { 
                ...v, 
                data: { 
                  ...v.data, 
                  skills: v.data.skills.filter(s => s.id !== id) 
                }, 
                updatedAt: Date.now() 
              }
            : v
        )
      })),

      updateInterests: (interests) => set((state) => ({
        versions: state.versions.map(v => 
          v.id === state.activeVersionId 
            ? { ...v, data: { ...v.data, interests }, updatedAt: Date.now() }
            : v
        )
      }))
    }),
    {
      name: 'kertaskerja-storage',
    }
  )
);

export const useActiveCV = () => {
  return useCVStore((state) => {
    return state.versions.find((v) => v.id === state.activeVersionId);
  });
};

export const useActiveCVData = () => {
  return useCVStore((state) => {
    const active = state.versions.find((v) => v.id === state.activeVersionId);
    return active?.data || INITIAL_DATA;
  });
};
