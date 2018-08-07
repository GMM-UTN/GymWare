using GymWare.DataAccess.DAL;
using GymWare.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Logic
{
    public class EjercicioLogic
    {
        private EjercicioRepository _ej = new EjercicioRepository();
        public List<Ejercicio> GetAll()
        {
            return _ej.GetAll();
        }

        public Ejercicio GetOne(int id)
        {
            return _ej.GetOne(id);
        }

        public bool Update(int id, Ejercicio ejercicio)
        {
            return _ej.Update(id, ejercicio);
        }

        public bool Insert(Ejercicio ejercicio)
        {
            return _ej.Insert(ejercicio);
        }

        public bool Delete(int id)
        {
            return _ej.Delete(id);
        }
    }
}
