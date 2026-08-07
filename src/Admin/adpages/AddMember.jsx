import React, { useState } from "react";
import { ArrowLeft, Camera, Save, UserRound, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  memberId: "GYM001",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  mobile: "",
  email: "",
  address: "",
  plan: "",
  joinDate: "",
  expiryDate: "",
  membershipStatus: "Active",
  trainer: "",
  fitnessGoal: "",
  height: "",
  weight: "",
  registrationFee: "",
  membershipFee: "",
  paymentMethod: "",
  paymentStatus: "Paid",
  emergencyContact: "",
  medicalCondition: "",
  notes: "",
};

const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

const Field = ({ label, name, required, error, children }) => (
  <div>
    <label className={labelClass} htmlFor={name}>{label}{required && <span className="ml-1 text-red-400">*</span>}</label>
    {children}
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

const AddMember = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [photoPreview, setPhotoPreview] = useState("");
  const [errors, setErrors] = useState({});

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    ["fullName", "gender", "mobile", "plan", "joinDate", "paymentMethod"].forEach((field) => {
      if (!form[field].trim()) nextErrors[field] = "This field is required.";
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    // Ready for API integration: submit `form` and the selected photo here.
    navigate("/admin/members");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-3 text-white sm:p-5 lg:p-7">
      {/* Page header */}
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-medium text-blue-400">Member management</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">Add New Member</h1><p className="mt-1 text-sm text-slate-400">Register a new gym member and assign membership details.</p></div>
        <button onClick={() => navigate("/admin/members")} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"><ArrowLeft size={17} />Back to Members</button>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-5">
        {/* Personal information */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-black/10 sm:p-6">
          <div className="mb-5 border-b border-slate-800 pb-4"><h2 className="text-lg font-semibold">Personal Information</h2><p className="mt-1 text-sm text-slate-400">Basic identity and contact information.</p></div>
          <div className="grid gap-5 md:grid-cols-[170px_minmax(0,1fr)]">
            <div className="flex flex-col items-center md:items-start"><div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-600 bg-slate-800">{photoPreview ? <img src={photoPreview} alt="Member preview" className="h-full w-full object-cover" /> : <UserRound size={42} className="text-slate-500" />}</div><label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600"><Camera size={16} />Upload Photo<input type="file" accept="image/*" onChange={handlePhoto} className="hidden" /></label>{photoPreview && <button type="button" onClick={() => setPhotoPreview("")} className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"><X size={13} />Remove photo</button>}</div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="fullName" required error={errors.fullName}><input id="fullName" name="fullName" value={form.fullName} onChange={updateField} placeholder="Enter member name" className={inputClass} /></Field>
              <Field label="Gender" name="gender" required error={errors.gender}><select id="gender" name="gender" value={form.gender} onChange={updateField} className={inputClass}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></Field>
              <Field label="Date of Birth" name="dateOfBirth"><input id="dateOfBirth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={updateField} className={inputClass} /></Field>
              <Field label="Mobile Number" name="mobile" required error={errors.mobile}><input id="mobile" name="mobile" type="tel" value={form.mobile} onChange={updateField} placeholder="Enter mobile number" className={inputClass} /></Field>
              <Field label="Email" name="email"><input id="email" name="email" type="email" value={form.email} onChange={updateField} placeholder="member@email.com" className={inputClass} /></Field>
              <Field label="Address" name="address"><input id="address" name="address" value={form.address} onChange={updateField} placeholder="Enter address" className={inputClass} /></Field>
            </div>
          </div>
        </section>

        {/* Membership details */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-black/10 sm:p-6"><div className="mb-5 border-b border-slate-800 pb-4"><h2 className="text-lg font-semibold">Membership Details</h2><p className="mt-1 text-sm text-slate-400">Set plan, dates and current membership status.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Member ID" name="memberId"><input id="memberId" name="memberId" value={form.memberId} readOnly className={`${inputClass} cursor-not-allowed text-slate-400`} /></Field><Field label="Membership Plan" name="plan" required error={errors.plan}><select id="plan" name="plan" value={form.plan} onChange={updateField} className={inputClass}><option value="">Select plan</option><option>Monthly</option><option>Quarterly</option><option>Half Yearly</option><option>Yearly</option></select></Field><Field label="Join Date" name="joinDate" required error={errors.joinDate}><input id="joinDate" name="joinDate" type="date" value={form.joinDate} onChange={updateField} className={inputClass} /></Field><Field label="Expiry Date" name="expiryDate"><input id="expiryDate" name="expiryDate" type="date" value={form.expiryDate} onChange={updateField} className={inputClass} /></Field><Field label="Membership Status" name="membershipStatus"><select id="membershipStatus" name="membershipStatus" value={form.membershipStatus} onChange={updateField} className={inputClass}><option>Active</option><option>Expired</option><option>Suspended</option></select></Field></div></section>

        {/* Fitness details */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-black/10 sm:p-6"><div className="mb-5 border-b border-slate-800 pb-4"><h2 className="text-lg font-semibold">Fitness Details</h2><p className="mt-1 text-sm text-slate-400">Capture goals and current body measurements.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Assigned Trainer" name="trainer"><select id="trainer" name="trainer" value={form.trainer} onChange={updateField} className={inputClass}><option value="">Select trainer</option><option>Alex Johnson</option><option>Mike Wilson</option><option>Sarah Miller</option><option>Emma Davis</option></select></Field><Field label="Fitness Goal" name="fitnessGoal"><select id="fitnessGoal" name="fitnessGoal" value={form.fitnessGoal} onChange={updateField} className={inputClass}><option value="">Select goal</option><option>Weight Loss</option><option>Muscle Gain</option><option>General Fitness</option><option>Strength</option><option>Cardio</option></select></Field><Field label="Height (cm)" name="height"><input id="height" name="height" type="number" min="0" value={form.height} onChange={updateField} placeholder="e.g. 175" className={inputClass} /></Field><Field label="Weight (kg)" name="weight"><input id="weight" name="weight" type="number" min="0" value={form.weight} onChange={updateField} placeholder="e.g. 70" className={inputClass} /></Field></div></section>

        {/* Payment details */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-black/10 sm:p-6"><div className="mb-5 border-b border-slate-800 pb-4"><h2 className="text-lg font-semibold">Payment Details</h2><p className="mt-1 text-sm text-slate-400">Record registration and membership payments.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Registration Fee" name="registrationFee"><input id="registrationFee" name="registrationFee" type="number" min="0" value={form.registrationFee} onChange={updateField} placeholder="Enter fee" className={inputClass} /></Field><Field label="Membership Fee" name="membershipFee"><input id="membershipFee" name="membershipFee" type="number" min="0" value={form.membershipFee} onChange={updateField} placeholder="Enter fee" className={inputClass} /></Field><Field label="Payment Method" name="paymentMethod" required error={errors.paymentMethod}><select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={updateField} className={inputClass}><option value="">Select payment method</option><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option></select></Field><Field label="Payment Status" name="paymentStatus"><select id="paymentStatus" name="paymentStatus" value={form.paymentStatus} onChange={updateField} className={inputClass}><option>Paid</option><option>Pending</option><option>Partial</option></select></Field></div></section>

        {/* Medical details */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl shadow-black/10 sm:p-6"><div className="mb-5 border-b border-slate-800 pb-4"><h2 className="text-lg font-semibold">Medical Details</h2><p className="mt-1 text-sm text-slate-400">Keep emergency and health information available to staff.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Emergency Contact" name="emergencyContact"><input id="emergencyContact" name="emergencyContact" type="tel" value={form.emergencyContact} onChange={updateField} placeholder="Name and phone number" className={inputClass} /></Field><Field label="Medical Condition" name="medicalCondition"><input id="medicalCondition" name="medicalCondition" value={form.medicalCondition} onChange={updateField} placeholder="Add condition if applicable" className={inputClass} /></Field><div className="sm:col-span-2"><Field label="Additional Notes" name="notes"><textarea id="notes" name="notes" rows="4" value={form.notes} onChange={updateField} placeholder="Add any important notes for the team" className={`${inputClass} resize-y`} /></Field></div></div></section>

        {/* Form actions */}
        <div className="flex flex-col-reverse gap-3 pb-4 sm:flex-row sm:justify-end"><button type="button" onClick={() => navigate("/admin/members")} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 sm:w-auto">Cancel</button><button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"><Save size={17} />Save Member</button></div>
      </form>
    </div>
  );
};

export default AddMember;
