// src/components/FormComponents/MainForm.jsx
import React, { useState } from "react";
import NameComponent from "./NameComponent";
import OpeningHoursComponent from "./OpeningHoursComponent";
import DescriptionComponent from "./DescriptionComponent";
import WebsiteComponent from "./WebsiteComponent";
import PhoneNumberComponent from "./PhoneNumberComponent";
import EmailComponent from "./EmailComponent";
import AccessibilityComponent from "./AccessibilityComponent";

const MainForm = ({ handleSubmit, longitude, latitude }) => {
  const [name, setName] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [accessibility, setAccessibility] = useState("");

  const [components, setComponents] = useState([
    {
      id: "openingHours",
      component: (
        <OpeningHoursComponent
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
      ),
      active: false,
    },
    {
      id: "description",
      component: (
        <DescriptionComponent
          description={description}
          setDescription={setDescription}
        />
      ),
      active: false,
    },
    {
      id: "website",
      component: <WebsiteComponent website={website} setWebsite={setWebsite} />,
      active: false,
    },
    {
      id: "phoneNumber",
      component: (
        <PhoneNumberComponent
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      ),
      active: false,
    },
    {
      id: "email",
      component: <EmailComponent email={email} setEmail={setEmail} />,
      active: false,
    },
    {
      id: "accessibility",
      component: (
        <AccessibilityComponent
          accessibility={accessibility}
          setAccessibility={setAccessibility}
        />
      ),
      active: false,
    },
  ]);

  const activateComponent = (id) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, active: true } : comp
      )
    );
  };

  const deactivateComponent = (id) => {
    setComponents(
      components.map((comp) =>
        comp.id === id ? { ...comp, active: false } : comp
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const details = {
      name,
      longitude,
      latitude,
      openingHours: openingHours || null,
      description: description || null,
      website: website || null,
      phoneNumber: phoneNumber || null,
      email: email || null,
      accessibility: accessibility || null,
    };
    console.log("Details being sent:", details); // Ajout du console.log
    handleSubmit(details);
  };

  return (
    <>
      <div className="component-pills">
        {components.map(
          (comp) =>
            !comp.active && (
              <button
                key={comp.id}
                type="button"
                onClick={() => activateComponent(comp.id)}
              >
                {comp.id}
              </button>
            )
        )}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-components-container">
          <div className="form-component">
            <NameComponent name={name} setName={setName} />
          </div>
          {components.map(
            (comp) =>
              comp.active && (
                <div key={comp.id} className="form-component">
                  {React.cloneElement(comp.component, {
                    name,
                    setName,
                    openingHours,
                    setOpeningHours,
                    description,
                    setDescription,
                    website,
                    setWebsite,
                    phoneNumber,
                    setPhoneNumber,
                    email,
                    setEmail,
                    accessibility,
                    setAccessibility,
                  })}
                  {comp.id !== "name" && (
                    <button
                      type="button"
                      onClick={() => deactivateComponent(comp.id)}
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              )
          )}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default MainForm;
