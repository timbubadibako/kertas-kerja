import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { CVData, TemplateId } from '../../types/cv';

// Define generic styles for PDF components
const pdfStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000',
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#E5E7EB',
    padding: 20,
    height: '100%',
  },
  main: {
    width: '68%',
    backgroundColor: '#FFF',
    padding: 30,
  },
  headerBox: {
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    height: 120,
    margin: 20,
    marginBottom: 0,
  },
  photoBox: {
    width: 120,
    height: '100%',
    borderRightWidth: 2,
    borderColor: '#000',
    backgroundColor: '#F3F4F6',
  },
  nameBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 8,
    marginTop: 15,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  textJustify: { textAlign: 'justify' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginLeft: 3,
  },
  dotEmpty: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginLeft: 3,
  },
  interestDot: {
    width: 3,
    height: 3,
    backgroundColor: '#000',
    marginRight: 5,
    marginTop: 5,
  },
});

interface PDFExporterProps {
  data: CVData;
  templateId?: TemplateId;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ data, templateId = 'template-1' }) => {
  const { personal, work, education, skills, interests = [] } = data;

  const renderSkillDots = (level: number) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5].map((d) => (
          <View key={d} style={d <= level ? pdfStyles.dot : pdfStyles.dotEmpty} />
        ))}
      </View>
    );
  };

  // Specific Renderer for Template 1 (Identic to Preview)
  if (templateId === 'template-1') {
    return (
      <Document title={`${personal.fullName || 'Resume'} - KertasKerja`}>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.headerBox}>
            <View style={pdfStyles.photoBox}>
              {personal.photo && <Image src={personal.photo} style={{ width: '100%', height: '100%' }} />}
            </View>
            <View style={pdfStyles.nameBox}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 2, textAlign: 'center' }}>
                {personal.fullName || 'Syifa Pajril Yaum'}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            {/* Sidebar */}
            <View style={pdfStyles.sidebar}>
              <Text style={pdfStyles.sectionTitle}>Personal</Text>
              <View style={{ gap: 8 }}>
                <View><Text style={pdfStyles.bold}>Name</Text><Text>{personal.fullName || 'Syifa Pajril Yaum'}</Text></View>
                <View><Text style={pdfStyles.bold}>Address</Text><Text style={{ fontSize: 8 }}>{personal.address}</Text></View>
                <View><Text style={pdfStyles.bold}>Phone</Text><Text>{personal.phone}</Text></View>
                <View><Text style={pdfStyles.bold}>Email</Text><Text style={{ fontSize: 8 }}>{personal.email}</Text></View>
                <View><Text style={pdfStyles.bold}>Date of birth</Text><Text>{personal.dob || '17-06-2005'}</Text></View>
              </View>

              <Text style={[pdfStyles.sectionTitle, { marginTop: 25 }]}>Interests</Text>
              <View style={{ gap: 5 }}>
                {(interests.length > 0 ? interests : ['Gym', 'Research AI', 'Traveling']).map((it, i) => (
                  <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={pdfStyles.interestDot} />
                    <Text style={{ fontSize: 9 }}>{it}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Main */}
            <View style={pdfStyles.main}>
              {personal.summary && (
                <View style={{ marginBottom: 20 }}>
                  <Text style={[pdfStyles.textJustify, { fontSize: 10 }]}>{personal.summary}</Text>
                </View>
              )}

              <Text style={pdfStyles.sectionTitle}>Work Experience</Text>
              <View style={{ gap: 12 }}>
                {work.map((exp, i) => (
                  <View key={i}>
                    <View style={pdfStyles.rowBetween}>
                      <Text style={pdfStyles.bold}>{exp.position}</Text>
                      <Text style={{ fontSize: 8, color: '#666' }}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <Text style={{ fontSize: 9, color: '#444', marginBottom: 4 }}>{exp.company}</Text>
                    <Text style={[pdfStyles.textJustify, { fontSize: 9 }]}>{exp.description.join(' ')}</Text>
                  </View>
                ))}
              </View>

              <Text style={pdfStyles.sectionTitle}>Education</Text>
              <View style={{ gap: 8 }}>
                {education.map((edu, i) => (
                  <View key={i}>
                    <View style={pdfStyles.rowBetween}>
                      <Text style={pdfStyles.bold}>{edu.degree}</Text>
                      <Text style={{ fontSize: 8 }}>{edu.graduationDate}</Text>
                    </View>
                    <Text style={{ fontSize: 9 }}>{edu.school}</Text>
                  </View>
                ))}
              </View>

              <Text style={pdfStyles.sectionTitle}>Skills</Text>
              <View style={{ gap: 6, maxWidth: 180 }}>
                {skills.map((s, i) => (
                  <View key={i} style={pdfStyles.rowBetween}>
                    <Text style={{ fontSize: 9 }}>{typeof s === 'string' ? s : s.name}</Text>
                    {renderSkillDots(typeof s === 'string' ? 3 : s.level)}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Template 8 (Navy Theme)
  if (templateId === 'template-8') {
    return (
      <Document title={`${personal.fullName || 'Resume'} - KertasKerja`}>
        <Page size="A4" style={pdfStyles.page}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {/* Sidebar with Navy Header */}
            <View style={[pdfStyles.sidebar, { padding: 0, width: '35%', backgroundColor: '#F3F4F6' }]}>
              <View style={{ backgroundColor: '#2D3154', padding: 20, paddingTop: 30, paddingBottom: 40, alignItems: 'center' }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1 }}>
                  {personal.fullName || 'Syifa Pajril Yaum'}
                </Text>
              </View>
              
              <View style={{ alignItems: 'center', marginTop: -35 }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#FFF', backgroundColor: '#DDD', overflow: 'hidden' }}>
                  {personal.photo && <Image src={personal.photo} style={{ width: '100%', height: '100%' }} />}
                </View>
              </View>

              <View style={{ padding: 20, gap: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4B5563', borderBottomWidth: 1, borderBottomColor: '#D1D5DB' }}>Personal</Text>
                <View style={{ gap: 10 }}>
                   <View><Text style={{ fontSize: 8, fontWeight: 'bold' }}>ADDRESS</Text><Text style={{ fontSize: 8 }}>{personal.address}</Text></View>
                   <View><Text style={{ fontSize: 8, fontWeight: 'bold' }}>PHONE</Text><Text style={{ fontSize: 8 }}>{personal.phone}</Text></View>
                   <View><Text style={{ fontSize: 8, fontWeight: 'bold' }}>EMAIL</Text><Text style={{ fontSize: 8 }}>{personal.email}</Text></View>
                </View>
              </View>
            </View>

            {/* Main Area */}
            <View style={[pdfStyles.main, { width: '65%' }]}>
              <Text style={[pdfStyles.textJustify, { marginBottom: 20 }]}>{personal.summary}</Text>
              
              <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' }}>Work Experience</Text>
              {work.map((exp, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <View style={pdfStyles.rowBetween}>
                    <Text style={pdfStyles.bold}>{exp.position}</Text>
                    <Text style={{ fontSize: 8 }}>{exp.startDate} - {exp.endDate}</Text>
                  </View>
                  <Text style={{ fontSize: 9, color: '#666' }}>{exp.company}</Text>
                  <Text style={{ fontSize: 9, marginTop: 4 }}>{exp.description.join(' ')}</Text>
                </View>
              ))}

              <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' }}>Skills</Text>
              <View style={{ gap: 6 }}>
                {skills.map((s, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth: 200 }}>
                    <Text style={{ fontSize: 9 }}>{typeof s === 'string' ? s : s.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {[1, 2, 3, 4, 5].map((d) => (
                        <View key={d} style={d <= (typeof s === 'string' ? 3 : s.level) ? [pdfStyles.dot, { backgroundColor: '#2D3154' }] : pdfStyles.dotEmpty} />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Fallback for other templates (Generic Standard)
  return (
    <Document title={`${personal.fullName || 'Resume'} - KertasKerja`}>
      <Page size="A4" style={{ padding: 40, fontFamily: 'Helvetica' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase' }}>{personal.fullName || 'Your Name'}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 5, fontSize: 9, borderBottomWidth: 1, paddingBottom: 10 }}>
          <Text>{personal.email}</Text>
          <Text>{personal.phone}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 }}>Summary</Text>
          <Text style={{ fontSize: 10, textAlign: 'justify' }}>{personal.summary}</Text>
        </View>
        {/* Simplified Generic content... */}
        <Text style={{ marginTop: 40, textAlign: 'center', color: '#999', fontSize: 8 }}>Exported via KertasKerja</Text>
      </Page>
    </Document>
  );
};

export default PDFExporter;
